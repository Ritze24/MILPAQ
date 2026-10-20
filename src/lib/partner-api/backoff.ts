// Delay (seconds) before retry N after the Nth failed attempt. Total ≈ 22 hours,
// then the delivery is marked dead.
export const RETRY_DELAYS_SECONDS = [60, 300, 900, 3600, 10800, 21600, 43200];
export const MAX_ATTEMPTS = RETRY_DELAYS_SECONDS.length + 1;

export function retryDelaySeconds(attemptsMade: number): number | null {
  return attemptsMade >= 1 && attemptsMade <= RETRY_DELAYS_SECONDS.length ? RETRY_DELAYS_SECONDS[attemptsMade - 1] : null;
}
