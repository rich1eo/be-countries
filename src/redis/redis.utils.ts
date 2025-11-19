import type { Response } from 'express'

import { redisClient } from './redis.client'

const saveToRedis = async (
  key: string,
  data: unknown,
  ttl: number = 60,
  debug: boolean = false,
) => {
  await redisClient.set(key, JSON.stringify(data), {
    expiration: {
      type: 'EX',
      value: ttl,
    },
  })

  if (debug) {
    console.log(`Saved to Redis by key: ${key} with TTL: ${ttl}`)
  }
}

const getFromRedis = async <T>(
  key: string,
  debug: boolean = false,
): Promise<T | null> => {
  const data = await redisClient.get(key)

  if (debug) {
    console.log(
      `Got from Redis by key: ${key} — `,
      data ? 'data found' : 'data not found',
    )
  }

  return data ? (JSON.parse(data) as T) : null
}

const cacheResponse = async (
  res: Response,
  data: unknown,
  { debug = false }: { debug?: boolean } = {},
) => {
  if (res.locals.cacheKey) {
    await saveToRedis(res.locals.cacheKey, data, res.locals.cacheTtl, debug)
  }
}

export { saveToRedis, getFromRedis, cacheResponse }
