import express from 'express'
import cors from 'cors'

import { appRouter } from './routes'
import { errorHandler } from './middlewares'
import { initRedisClient } from './redis'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(appRouter)

app.use(errorHandler)

const init = async () => {
  try {
    await initRedisClient()

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error('Error initializing the application', error)
  }
}

init()
