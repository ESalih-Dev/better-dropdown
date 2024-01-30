import { useEffect, useState } from "react"
import { Bird, Calendar, Info, Text } from "lucide-react"
import { ButtonGroup, CircularProgress, IconButton, Tooltip } from "@mui/joy"
import { ItineraryActivities, generateItinerary } from "../lib/itineraryGen"
import { ItineraryDay } from "./itineraryDay"

interface Props {
  city: string | null
  duration: number | null
  focus: string | null
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const EmptyState = () => (
  <div className="px-4 py-20 flex flex-col text-center items-center font-extralight text-3xl border-2 rounded-3xl border-cyan-500 space-y-4">
    <Bird className="w-12 h-12" />
    Your itinerary will appear here as you tell us about your trip!
  </div>
)

export const Itinerary = ({
  city,
  duration,
  focus,
  isLoading,
  setIsLoading,
}: Props) => {
  const [itinerary, setItinerary] = useState<
    ItineraryActivities[] | undefined
  >()

  useEffect(() => {
    const itineraryGen = async () => {
      if (city && duration) {
        setIsLoading(true)
        const response = await generateItinerary({ city, duration, focus })
        setIsLoading(false)
        setItinerary(response)
      }
    }
    itineraryGen()
  }, [city, duration, focus])

  return (
    <div className="w-full h-full space-y-2">
      {isLoading ? (
        <div className="flex flex-col text-center items-center">
          <CircularProgress />
          <span>Thinking...</span>
        </div>
      ) : itinerary === undefined ? (
        <EmptyState />
      ) : (
        <>
          <span className="text-xl font-semibold text-slate-800">
            Your itinerary!
          </span>
          <div className="flex flex-col bg-slate-700 text-slate-100 rounded-xl space-y-4 p-4">
            {itinerary.map((dayPlan) => (
              <ItineraryDay plan={dayPlan} />
            ))}
          </div>
          <ButtonGroup className="ml-3">
            <Tooltip title="Change to a text view of this itinerary">
              <IconButton>
                <Text />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                <div className="flex flex-col space-y-2 items-center">
                  <span className="flex flex-row font-semibold items-center space-x-2">
                    <Info />
                    <span>Coming soon</span>
                  </span>
                  <span>Change to a calendar view of this itinerary</span>
                </div>
              }
            >
              <div>
                <IconButton disabled>
                  <Calendar />
                </IconButton>
              </div>
            </Tooltip>
          </ButtonGroup>
        </>
      )}
    </div>
  )
}
