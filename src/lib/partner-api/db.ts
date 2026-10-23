import mysql, { type Pool, type PoolConnection, type ResultSetHeader } from "mysql2/promise";
import { dbUrlFor, type ApiEnvironment } from "./config.ts";
import { ApiError } from "./errors.ts";
import { MIGRATIONS } from "./migrations.ts";

export type Queryable = Pool | PoolConnection;

// Pools and the "schema ready" promise live on globalThis so every route
// bundle in the Next.js server shares one pool per environment. Nothing here
// runs at import time: the build must pass with no database configured.
const g = globalThis as unknown as {
  __milpaqPartnerPools?: Map<ApiEnvironment, Pool>;
  __milpaqPartnerSchema?: Map<ApiEnvironment, Promise<void>>;
};

export function getPool(env: ApiEnvironment): Pool | null {
  const url = dbUrlFor(env);
  if (!url) return null;
  g.__milpaqPartnerPools ??= new Map();
  const existing = g.__milpaqPartnerPools.get(env);
  if (existing) return existing;
  const u = new URL(url);
  const pool = mysql.createPool({
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
    waitForConnections: true,
    connectionLimit: 5,
    connectTimeout: 10_000,
    timezone: "Z",
    charset: "utf8mb4",
    decimalNumbers: true,
  });
  g.__milpaqPartnerPools.set(env, pool);
  return pool;
}

export async function ensureSchema(env: ApiEnvironment, pool: Pool): Promise<void> {
  g.__milpaqPartnerSchema ??= new Map();
  let ready = g.__milpaqPartnerSchema.get(env);
  if (!ready) {
    ready = migrate(pool).catch((err) => {
      g.__milpaqPartnerSchema?.delete(env); // allow a retry on the next call
      throw err;
    });
    g.__milpaqPartnerSchema.set(env, ready);
  }
  return ready;
}

async function migrate(pool: Pool): Promise<void> {
  const conn = await pool.getConnection();
  try {
    const [lock] = await conn.query("SELECT GET_LOCK('milpaq_partner_migrate', 30) AS got");
    if ((lock as { got: number }[])[0]?.got !== 1) throw new Error("Could not acquire migration lock");
    await conn.query(
      "CREATE TABLE IF NOT EXISTS schema_migrations (version INT PRIMARY KEY, applied_at DATETIME(3) NOT NULL) ENGINE=InnoDB",
    );
    const [applied] = await conn.query("SELECT version FROM schema_migrations");
    const done = new Set((applied as { version: number }[]).map((r) => r.version));
    for (const m of MIGRATIONS) {
      if (done.has(m.version)) continue;
      for (const step of m.statements) {
        if (typeof step === "string") await conn.query(step);
        else await step(conn);
      }
      await conn.query("INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)", [m.version, new Date()]);
    }
    await conn.query("SELECT RELEASE_LOCK('milpaq_partner_migrate')");
  } finally {
    conn.release();
  }
}

// Returns a ready pool or throws the 503 clients see when the API is not configured.
export async function requirePool(env: ApiEnvironment): Promise<Pool> {
  const pool = getPool(env);
  if (!pool) throw new ApiError("unavailable", "The MILPAQ API is not available right now.");
  try {
    await ensureSchema(env, pool);
  } catch (err) {
    console.error("[partner-api] schema check failed", env, err instanceof Error ? err.message : err);
    throw new ApiError("unavailable", "The MILPAQ API is not available right now.");
  }
  return pool;
}

export async function rows<T>(db: Queryable, sql: string, params: unknown[] = []): Promise<T[]> {
  const [result] = await db.query(sql, params);
  return result as unknown as T[];
}

export async function exec(db: Queryable, sql: string, params: unknown[] = []): Promise<ResultSetHeader> {
  const [result] = await db.query(sql, params);
  return result as ResultSetHeader;
}

export async function withTx<T>(pool: Pool, fn: (conn: PoolConnection) => Promise<T>): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback().catch(() => undefined);
    throw err;
  } finally {
    conn.release();
  }
}

export function isDuplicateKey(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "ER_DUP_ENTRY";
}
