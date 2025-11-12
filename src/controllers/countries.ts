import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { COUNTRIES_API_URL } from '../constants'
import { FailedToFetchError, NotFoundError } from '../errors'
import { mapAllCountries, mapCountry } from '../mappers'
import { cacheResponse } from '../redis'
import { getNeighbors } from '../services'

export const getAllCountries = async (req: Request, res: Response) => {
  const response = await fetch(
    `${COUNTRIES_API_URL}/all?fields=name,capital,flags,population,region`,
  )

  if (!response.ok) {
    throw new FailedToFetchError('Failed to fetch countries')
  }

  const data = (await response.json()) as any[]
  const countries = mapAllCountries(data)

  await cacheResponse(res, countries, { debug: true })

  res.status(StatusCodes.OK).json(countries)
}

export const getCountryByName = async (req: Request, res: Response) => {
  const { name } = req.params

  const response = await fetch(`${COUNTRIES_API_URL}/name/${name}`)

  if (!response.ok) {
    if (response.status === StatusCodes.NOT_FOUND) {
      throw new NotFoundError('Country not found')
    } else {
      throw new FailedToFetchError('Failed to fetch country')
    }
  }

  const data = (await response.json()) as any[]

  const country = data[0]

  if (!country) {
    throw new NotFoundError('Country not found')
  }

  const borderCodes = country.borders?.join(',')

  if (borderCodes) {
    country.neighbors = await getNeighbors(borderCodes)
  }

  const mappedCountry = mapCountry(country)

  await cacheResponse(res, mappedCountry, { debug: true })

  res.status(StatusCodes.OK).json(mappedCountry)
}
