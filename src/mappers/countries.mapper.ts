const mapCountry = (country: any) => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    region: country.region,
    population: country.population,
    flags: country.flags,
  }
}

const compareCountries = (country1: any, country2: any): number => {
  const name1 = country1.name.toLowerCase()
  const name2 = country2.name.toLowerCase()

  return name1.localeCompare(name2)
}

const mapAllCountries = (countries: any[]) => {
  return countries.map(mapCountry).sort(compareCountries)
}

export { mapAllCountries }
