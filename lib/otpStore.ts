import { Redis } from '@upstash/redis';

// Fallback in-memory store for local/dev when Redis isn’t configured
const memoryStore = new Map<string, { code: string }>();

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const KEY_PREFIX = 'otp:';

export async function setOtp(email: string, code: string): Promise<void> {
  const record = { code };
  if (redis) {
    // Store without TTL for prototype (no expiry)
    await redis.set(KEY_PREFIX + email, JSON.stringify(record));
  } else {
    memoryStore.set(email, record);
  }
}

export async function getOtp(email: string): Promise<{ code: string } | null> {
  if (redis) {
    const raw = await redis.get<string | null>(KEY_PREFIX + email);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as { code: string };
      return parsed;
    } catch {
      return null;
    }
  }
  return memoryStore.get(email) ?? null;
}

export async function deleteOtp(email: string): Promise<void> {
  if (redis) {
    await redis.del(KEY_PREFIX + email);
  } else {
    memoryStore.delete(email);
  }
}

export function isUsingRedis(): boolean {
  return !!redis;
}