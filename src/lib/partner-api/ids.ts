import { randomBytes } from "node:crypto";

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

// ULID-style: 10 time chars + 16 random chars, sortable by creation time.
export function newId(prefix: string, now = Date.now()): string {
  let t = now;
  let time = "";
  for (let i = 0; i < 10; i++) {
    time = CROCKFORD[t % 32] + time;
    t = Math.floor(t / 32);
  }
  const rand = randomBytes(16);
  let random = "";
  for (let i = 0; i < 16; i++) random += CROCKFORD[rand[i] % 32];
  return `${prefix}${time}${random}`;
}
