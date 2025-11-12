import type { NextFunction, Request, Response } from 'express'

type CacheControlOptions = {
  /**
   * The strategy to use for caching the response
   * @default 'public'
   */
  strategy?: 'public' | 'private' | 'no-cache' | 'no-store'
  /**
   * The maximum age of the cached response in seconds
   * @default 86400 "(24 hours)"
   */
  maxAge?: number
}

export const cacheControl =
  (options: CacheControlOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { strategy = 'public', maxAge = 86400 } = options

    res.setHeader('Cache-Control', `${strategy}, max-age=${maxAge}`)

    next()
  }
