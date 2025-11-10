import { extractNames } from '../helpers/extract-names'

export const mapCountry = (country: any) => {
  return {
    name: country.name,
    nativeName: country.nativeName,
    flag: country.flag,
    capital: country.capital,
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.topLevelDomain,
    currencies: extractNames(country.currencies),
    languages: extractNames(country.languages),
    borders: country.borders,
    neighbors: country.neighbors,
  }
}
