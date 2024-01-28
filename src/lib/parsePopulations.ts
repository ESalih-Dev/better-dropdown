interface DataEntry {
  country: string
  city: string
  population: number
}

export type PopulationData = {
  location: string
  population: number
}[]

export const parseData = (populationData: DataEntry[]): PopulationData =>
  populationData
    .map(({ country, city, population }) => ({
      location: `${city}, ${country}`,
      population,
    }))
    .sort((a, b) => b.population - a.population)
