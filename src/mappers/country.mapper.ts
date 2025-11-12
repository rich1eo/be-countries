const extractNativeName = (nativeName: Record<string, any>): string =>
  Object.values(nativeName)[0]?.common

const extractCurrencies = (currencies: Record<string, any>): string[] =>
  Object.values(currencies).map((currency) => currency.name)

const extractLanguages = (languages: Record<string, string>): string[] =>
  Object.values(languages).map((language) => language)

const mapCountry = (country: any) => {
  return {
    name: country.name.common,
    nativeName: extractNativeName(country.name.nativeName),
    flag: country.flags.svg,
    capital: country.capital[0],
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.tld,
    currencies: extractCurrencies(country.currencies),
    languages: extractLanguages(country.languages),
    borders: country.borders,
    neighbors: country.neighbors,
  }
}

export { mapCountry }
