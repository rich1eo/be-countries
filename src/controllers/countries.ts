import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { mapCountry } from '../mappers'
import { FailedToFetchError, NotFoundError } from '../errors'
import { COUNTRIES_API_URL } from '../constants'
import { getNeighbors } from '../services/get-neighbors'

export const getAllCountries = async (req: Request, res: Response) => {
  const response = await fetch(
    `${COUNTRIES_API_URL}/all?fields=name,capital,flags,population,region`,
  )

  if (!response.ok) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to fetch countries' })
  }

  const data = await response.json()

  res.status(StatusCodes.OK).json(data)
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

  res.status(StatusCodes.OK).json(mappedCountry)
}
