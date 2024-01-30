import { IconButton, Tooltip } from "@mui/joy"
import { ItineraryActivities } from "../lib/itineraryGen"
import { Heart } from "lucide-react"

interface Props {
  plan: ItineraryActivities
}

const SaveButton = () => (
  <Tooltip title="Save this activity" size="sm" sx={{ bgcolor: "black" }}>
    <Heart size={24} className="hover:stroke-red-600 cursor-pointer" />
  </Tooltip>
)

export const ItineraryDay = ({ plan }: Props) => (
  <div className="flex flex-col space-y-2 text-white">
    <div className="bg-cyan-700 w-min whitespace-nowrap rounded-md py-1 px-4">{`Day ${plan.day}`}</div>
    <ul className="space-y-2 px-2">
      <li className="flex flex-row justify-between">
        <div>
          <span className="font-bold">Morning: </span>
          {plan.activities.morning}
        </div>
        <SaveButton />
      </li>
      <li className="flex flex-row justify-between">
        <div>
          <span className="font-bold">Afternoon: </span>
          {plan.activities.afternoon}
        </div>
        <SaveButton />
      </li>
      <li className="flex flex-row justify-between">
        <div>
          <span className="font-bold">Evening: </span>
          {plan.activities.evening}
        </div>
        <SaveButton />
      </li>
    </ul>
  </div>
)
