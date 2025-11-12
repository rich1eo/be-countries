import { Router } from 'express'

import { getAllCountries, getCountryByName } from '../controllers/countries'
import { cacheControl, redisCache } from '../middlewares'

const countriesRouter = Router()

countriesRouter.get(
  '/',
  cacheControl(),
  redisCache({ ttl: 10, debug: true }),
  getAllCountries,
)
countriesRouter.get(
  '/name/:name',
  cacheControl(),
  redisCache({ ttl: 10, debug: true }),
  getCountryByName,
)

export { countriesRouter }
