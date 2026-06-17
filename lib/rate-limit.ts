import { Ratelimit } from "@upstash/ratelimit"
// Use the edge-compatible build — avoids node:crypto so Turbopack's edge analysis passes
import { Redis } from "@upstash/redis/cloudflare"

function makeRatelimiter(requests: number, window: `${number} ${"s" | "m" | "h" | "d"}`) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  return new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: false,
  })
}

export const loginLimiter       = makeRatelimiter(5, "15 m") // login: 5/15min, keyed by IP+email
export const registerLimiter    = makeRatelimiter(3, "1 h")  // register: 3/hr
export const forgotLimiter      = makeRatelimiter(3, "1 h")  // forgot password: 3/hr
export const resetLimiter       = makeRatelimiter(5, "15 m") // reset password: 5/15min
export const resendLimiter      = makeRatelimiter(3, "15 m") // resend verification: 3/15min + email key
export const checkEmailLimiter  = makeRatelimiter(5, "15 m") // check email availability: 5/15min

/** Returns true if the request is allowed, false if rate-limited. Fails open when Upstash is not configured or unavailable. */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  key: string,
): Promise<boolean> {
  if (!limiter) return true
  try {
    const { success } = await limiter.limit(key)
    return success
  } catch {
    return true
  }
}

/** Returns allowed status + seconds until the window resets (for Retry-After header). Fails open when Upstash is not configured or unavailable. */
export async function checkRateLimitWithRetry(
  limiter: Ratelimit | null,
  key: string,
): Promise<{ allowed: boolean; retryAfter: number }> {
  if (!limiter) return { allowed: true, retryAfter: 0 }
  try {
    const { success, reset } = await limiter.limit(key)
    const retryAfter = success ? 0 : Math.ceil((reset - Date.now()) / 1000)
    return { allowed: success, retryAfter }
  } catch {
    return { allowed: true, retryAfter: 0 }
  }
}
