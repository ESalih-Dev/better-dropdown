interface DataEntry {
  country: string
  city: string
  population: number
}

export const parseData = (populationData: DataEntry[]): string[] =>
  populationData
    .sort((a, b) => b.population - a.population)
    .map(({ country, city }) => `${city}, ${country}`)
