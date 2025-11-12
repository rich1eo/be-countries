import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_CLIENT_URL,
})

const initRedisClient = async () => {
  redisClient.on('error', (err) => console.error('Redis Client Error', err))

  redisClient.on('connect', () => console.log('Redis Client Connected'))

  await redisClient.connect()
}

export { redisClient, initRedisClient }
