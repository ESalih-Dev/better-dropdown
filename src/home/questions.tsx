import { useMemo, useState } from "react"
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ToggleButtonGroup,
} from "@mui/joy"
import cityPopulations from "../data/cityPopulations.json"
import { parseData } from "../lib/parsePopulations"
import { Info, Landmark, Library, Palmtree } from "lucide-react"
import { Grow, useMediaQuery } from "@mui/material"

interface Props {
  isLoading: boolean
  city: string | null
  setCity: (selected: string | null) => void
  duration: number | null
  setDuration: (selected: number | null) => void
  focus: string | null
  setFocus: (selected: string | null) => void
}

export const Questions = ({
  isLoading,
  city,
  setCity,
  duration,
  setDuration,
  focus,
  setFocus,
}: Props) => {
  // Calculate and store once and for all
  const populationData = useMemo(() => parseData(cityPopulations), [])
  const [durationError, setDurationError] = useState(false)
  const isDesktop = useMediaQuery("(min-width:600px)")

  return (
    <div className="space-y-4 w-full">
      <FormControl disabled={isLoading}>
        <FormLabel>Where would you like to go?</FormLabel>
        <Autocomplete
          placeholder="Search by city..."
          options={populationData}
          value={city}
          onChange={(_e, selected) => setCity(selected)}
          sx={{ maxWidth: 400 }}
        />
        <FormHelperText>Cities are ordered by population</FormHelperText>
      </FormControl>
      <FormControl {...(durationError && { error: true })} disabled={isLoading}>
        <FormLabel>How long for?</FormLabel>
        <Input
          sx={{ maxWidth: 200 }}
          endDecorator="days"
          variant="outlined"
          value={duration || ""}
          onChange={({ target: { value } }) => {
            const maybeDuration = Number(value)
            if (isNaN(maybeDuration)) {
              setDurationError(true)
            } else {
              setDurationError(false)
              setDuration(maybeDuration)
            }
          }}
        />
        {durationError && (
          <FormHelperText>
            <Info />
            Oops! Please only enter numbers.
          </FormHelperText>
        )}
      </FormControl>
      <Grow in={!!(city && duration)} timeout={1000} unmountOnExit>
        <FormControl disabled={isLoading}>
          <FormLabel>What's the focus of your trip?</FormLabel>
          <ToggleButtonGroup
            disabled={isLoading}
            spacing={2}
            value={focus}
            orientation={isDesktop ? "horizontal" : "vertical"}
            onChange={(_e, selected) => {
              setFocus(focus === selected ? null : selected)
            }}
          >
            <Button variant="outlined" value="culture and history">
              <Library className="mr-2" /> Culture and History
            </Button>
            <Button variant="outlined" value="popular landmarks">
              <Landmark className="mr-2" /> Popular landmarks
            </Button>
            <Button variant="outlined" value="rest and relaxation">
              <Palmtree className="mr-2" /> Rest and Relaxation
            </Button>
          </ToggleButtonGroup>
        </FormControl>
      </Grow>
    </div>
  )
}
