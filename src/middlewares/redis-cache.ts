import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getFromRedis } from '../redis'
import { CacheError } from '../errors'

type RedisCacheOptions = {
  ttl: number
  debug: boolean
}

const redisCache =
  (options: RedisCacheOptions = { ttl: 60, debug: false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = req.originalUrl

    try {
      const cachedData = await getFromRedis<unknown>(cacheKey, options.debug)

      if (cachedData) {
        res.status(StatusCodes.OK).json(cachedData)
        return
      }

      res.locals.cacheKey = cacheKey
      res.locals.cacheTtl = options.ttl

      next()
    } catch (error) {
      console.error(error)
      next(new CacheError('Cannot read from redis'))
    }
  }

export { redisCache }
