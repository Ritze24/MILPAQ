import type { PoolConnection } from "mysql2/promise";
import { WEBSITE_PARTNER_NAME } from "./config.ts";

export type MigrationStep = string | ((conn: PoolConnection) => Promise<void>);

// Applied automatically (idempotent, under an advisory lock) the first time an
// API call or the cron endpoint touches a database. All statements use
// IF NOT EXISTS so a partially applied migration can simply be re-run.
export const MIGRATIONS: { version: number; statements: MigrationStep[] }[] = [
  {
    version: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS partners (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        created_at DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS api_keys (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        partner_id INT UNSIGNED NOT NULL,
        key_prefix VARCHAR(16) NOT NULL,
        key_hash CHAR(64) NOT NULL,
        status VARCHAR(10) NOT NULL DEFAULT 'active',
        created_at DATETIME(3) NOT NULL,
        last_used_at DATETIME(3) NULL,
        revoked_at DATETIME(3) NULL,
        UNIQUE KEY uq_key_hash (key_hash),
        KEY idx_partner (partner_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS webhook_endpoints (
        partner_id INT UNSIGNED PRIMARY KEY,
        url VARCHAR(500) NOT NULL,
        updated_at DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS webhook_secrets (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        partner_id INT UNSIGNED NOT NULL,
        secret_enc TEXT NOT NULL,
        status VARCHAR(10) NOT NULL DEFAULT 'active',
        created_at DATETIME(3) NOT NULL,
        retired_at DATETIME(3) NULL,
        KEY idx_partner_status (partner_id, status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS quote_requests (
        id VARCHAR(40) PRIMARY KEY,
        partner_id INT UNSIGNED NOT NULL,
        external_request_id VARCHAR(64) NOT NULL,
        idempotency_key VARCHAR(128) NOT NULL,
        fingerprint CHAR(64) NOT NULL,
        status VARCHAR(40) NOT NULL,
        company_name VARCHAR(200) NOT NULL,
        contact_name VARCHAR(120) NOT NULL,
        contact_email VARCHAR(254) NOT NULL,
        contact_phone VARCHAR(40) NOT NULL,
        solicitation_number VARCHAR(60) NOT NULL,
        number_of_units INT UNSIGNED NOT NULL,
        unit_length DECIMAL(12,3) NOT NULL,
        unit_width DECIMAL(12,3) NOT NULL,
        unit_height DECIMAL(12,3) NOT NULL,
        dimension_unit VARCHAR(2) NOT NULL,
        unit_weight DECIMAL(12,3) NOT NULL,
        weight_unit VARCHAR(2) NOT NULL,
        origin_inspection TINYINT(1) NOT NULL,
        destination_inspection TINYINT(1) NOT NULL,
        notes TEXT NULL,
        terms_version VARCHAR(32) NOT NULL,
        terms_accepted_at DATETIME(3) NOT NULL,
        terms_accepted_by VARCHAR(128) NOT NULL,
        status_message TEXT NULL,
        currency CHAR(3) NULL,
        packaging_price DECIMAL(12,2) NULL,
        shipping_price DECIMAL(12,2) NULL,
        total_amount DECIMAL(12,2) NULL,
        quote_number VARCHAR(64) NULL,
        quote_expires_at DATETIME(3) NULL,
        quote_notes TEXT NULL,
        received_at DATETIME(3) NOT NULL,
        updated_at DATETIME(3) NOT NULL,
        UNIQUE KEY uq_partner_external (partner_id, external_request_id),
        UNIQUE KEY uq_partner_idempotency (partner_id, idempotency_key),
        KEY idx_status_updated (status, updated_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS request_files (
        id VARCHAR(40) PRIMARY KEY,
        request_id VARCHAR(40) NOT NULL,
        kind VARCHAR(20) NOT NULL,
        path VARCHAR(300) NOT NULL,
        filename VARCHAR(200) NOT NULL,
        content_type VARCHAR(100) NOT NULL,
        size_bytes INT UNSIGNED NOT NULL,
        sha256 CHAR(64) NOT NULL,
        created_at DATETIME(3) NOT NULL,
        KEY idx_request_kind (request_id, kind)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS request_events (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        request_id VARCHAR(40) NOT NULL,
        status VARCHAR(40) NOT NULL,
        detail TEXT NULL,
        occurred_at DATETIME(3) NOT NULL,
        KEY idx_request (request_id, occurred_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS request_messages (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        request_id VARCHAR(40) NOT NULL,
        direction VARCHAR(10) NOT NULL,
        body TEXT NOT NULL,
        created_at DATETIME(3) NOT NULL,
        KEY idx_request (request_id, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS webhook_deliveries (
        id VARCHAR(40) PRIMARY KEY,
        partner_id INT UNSIGNED NOT NULL,
        request_id VARCHAR(40) NOT NULL,
        event_id VARCHAR(40) NOT NULL,
        event_type VARCHAR(60) NOT NULL,
        payload MEDIUMTEXT NOT NULL,
        status VARCHAR(10) NOT NULL DEFAULT 'pending',
        attempts INT UNSIGNED NOT NULL DEFAULT 0,
        next_attempt_at DATETIME(3) NOT NULL,
        lease_until DATETIME(3) NULL,
        last_status_code INT NULL,
        last_error VARCHAR(300) NULL,
        created_at DATETIME(3) NOT NULL,
        delivered_at DATETIME(3) NULL,
        KEY idx_due (status, next_attempt_at),
        KEY idx_request (request_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      `CREATE TABLE IF NOT EXISTS rate_limits (
        key_id INT UNSIGNED NOT NULL,
        kind VARCHAR(10) NOT NULL,
        bucket BIGINT UNSIGNED NOT NULL,
        hits INT UNSIGNED NOT NULL DEFAULT 0,
        PRIMARY KEY (key_id, kind, bucket)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    ],
  },
  {
    // Website RFQs share the quote_requests table. `source` tells them apart from
    // partner API requests; website rows never queue webhooks. ADD COLUMN has no
    // IF NOT EXISTS on every MySQL version, so the check is done by hand.
    version: 2,
    statements: [
      async (conn) => {
        const [found] = await conn.query(
          "SELECT COUNT(*) AS n FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'quote_requests' AND COLUMN_NAME = 'source'",
        );
        if (Number((found as { n: number }[])[0]?.n) === 0) {
          await conn.query("ALTER TABLE quote_requests ADD COLUMN source VARCHAR(10) NOT NULL DEFAULT 'partner'");
        }
      },
      async (conn) => {
        const [found] = await conn.query("SELECT id FROM partners WHERE name = ? LIMIT 1", [WEBSITE_PARTNER_NAME]);
        if ((found as unknown[]).length === 0) {
          await conn.query("INSERT INTO partners (name, created_at) VALUES (?, ?)", [WEBSITE_PARTNER_NAME, new Date()]);
        }
      },
    ],
  },
];
