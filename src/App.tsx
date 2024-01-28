import { BetterDropdown } from "./components/betterDropdown"
import cityPopulations from "./data/cityPopulations.json"
import { parseData } from "./lib/parsePopulations"

const App = () => (
  <div className="m-4 space-y-4">
    <div className="text-4xl font-extralight">✌️ Hello</div>
    <div>Guess who just made a new dropdown 😎</div>
    <div className="rounded-md p-4 border-2 border-sky-500 sm:w-[600px] space-y-8">
      <div className="text-xl font-semibold">
        Where are you travelling from?
      </div>
      <BetterDropdown populationData={parseData(cityPopulations)} />
    </div>
  </div>
)

export default App
