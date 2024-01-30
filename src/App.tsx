import { useEffect, useState } from "react"
import { Questions } from "./home/questions"
import { Itinerary } from "./home/itinerary"
import { Divider } from "@mui/joy"
import { useMediaQuery } from "@mui/material"

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const isDesktop = useMediaQuery("(min-width:600px)")

  return (
    <div className="m-4 space-y-4">
      <div className="text-4xl font-extralight">✌️ Hello</div>
      <div>
        Guess who just <s>made a new dropdown</s> <b>integrated with ChatGPT</b>{" "}
        😎
      </div>
      <div className="flex flex-col justify-between sm:flex-row w-full space-y-8 sm:space-x-8 h-full">
        <Questions
          isLoading={isLoading}
          city={city}
          setCity={setCity}
          duration={duration}
          setDuration={setDuration}
          focus={focus}
          setFocus={setFocus}
        />
        {!isDesktop && <Divider orientation="horizontal" />}
        <Itinerary
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          city={city}
          duration={duration}
          focus={focus}
        />
      </div>
    </div>
  )
}
export default App
