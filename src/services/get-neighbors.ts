import { StatusCodes } from 'http-status-codes'

import { COUNTRIES_API_URL } from '../constants'
import { FailedToFetchError, NotFoundError } from '../errors'

const extractNeighborNames = (collection: any[] = []) => {
  return collection.map((item) => item.name.common)
}

export const getNeighbors = async (codes: string) => {
  const response = await fetch(`${COUNTRIES_API_URL}/alpha?codes=${codes}`)

  if (!response.ok) {
    if (response.status === StatusCodes.NOT_FOUND) {
      throw new NotFoundError('Neighbors not found')
    } else {
      throw new FailedToFetchError('Failed to fetch neighbors')
    }
  }

  const data = (await response.json()) as any[]

  return extractNeighborNames(data)
}
