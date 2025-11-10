import { Router } from 'express'
import countriesRouter from './countries'

const router = Router()

router.use('/countries', countriesRouter)

export default router
