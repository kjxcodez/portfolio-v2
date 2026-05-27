export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// Always-pass result when Redis is not configured (dev / missing env vars)
const PASS: RateLimitResult = { success: true, limit: 0, remaining: 0, reset: 0 }

async function buildLimiter(prefix: string, requests: number, window: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  const { Redis } = await import('@upstash/redis')
  const { Ratelimit } = await import('@upstash/ratelimit')

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(requests, window as `${number} ${'ms' | 's' | 'm' | 'h' | 'd'}`),
    prefix,
  })
}

export async function checkContactRateLimit(ip: string): Promise<RateLimitResult> {
  const limiter = await buildLimiter('rl:contact', 3, '30 m')
  if (!limiter) return PASS
  return limiter.limit(ip)
}

export async function checkChatRateLimit(ip: string): Promise<RateLimitResult> {
  const limiter = await buildLimiter('rl:chat', 20, '10 m')
  if (!limiter) return PASS
  return limiter.limit(ip)
}
