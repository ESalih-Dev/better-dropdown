import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "../lib/utils"
import { PopulationData } from "../lib/parsePopulations"
import { Combobox } from "@headlessui/react"

interface Props {
  populationData: PopulationData
}

export const BetterDropdown = ({ populationData }: Props) => {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")

  return (
    <Combobox
      as="div"
      value={location}
      onChange={(selected) =>
        setLocation(selected === location ? "" : selected)
      }
    >
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Select city..."
          onChange={(event) => setSearch(event.target.value)}
          displayValue={() => location}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {location && (
            <X
              className="h-5 w-5 mr-2 text-gray-400"
              aria-hidden="true"
              onClick={() => {
                setSearch("")
                setLocation("")
              }}
            />
          )}
          <ChevronsUpDown
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        {populationData.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {populationData
              .filter((place) =>
                place.location
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((place) => (
                <Combobox.Option
                  key={place.location}
                  value={place.location}
                  className={({ active }) =>
                    cn(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={cn(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {place.location}
                      </span>

                      {selected && (
                        <span
                          className={cn(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
