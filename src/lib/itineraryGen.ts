import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: atob(process.env.REACT_APP_OPENAI_API_KEY!),
  dangerouslyAllowBrowser: true,
})

interface Props {
  city: string
  duration: number
  focus: string | null
}

export interface ItineraryActivities {
  day: number
  activities: {
    morning: string
    afternoon: string
    evening: string
  }
}

const response: { itinerary: ItineraryActivities[] } = {
  itinerary: [
    {
      day: 1,
      activities: {
        morning: "Visit Senso-ji Temple",
        afternoon: "Explore Ueno Park",
        evening: "Dinner in Shibuya",
      },
    },
    {
      day: 2,
      activities: {
        morning: "Visit Meiji Shrine",
        afternoon: "Shop in Ginza",
        evening: "Enjoy nightlife in Roppongi",
      },
    },
    {
      day: 3,
      activities: {
        morning: "Explore Tsukiji Fish Market",
        afternoon: "Visit Tokyo Disneyland",
        evening: "Go to Odaiba",
      },
    },
    {
      day: 4,
      activities: {
        morning: "Visit Tokyo Tower",
        afternoon: "Stroll in Yoyogi Park",
        evening: "Enjoy dinner in Shinjuku",
      },
    },
  ],
}

export const generateItinerary = async ({
  city,
  duration,
  focus,
}: Props): Promise<ItineraryActivities[]> => {
  const gptResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "user",
        content: `Create a ${duration} day itinerary for ${city}${
          focus ? ` focussed around ${focus}` : ""
        }`,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "generate_itinerary",
          description: "Generate an itinerary given a city and duration",
          parameters: {
            type: "object",
            description: "The generated itinerary",
            properties: {
              itinerary: {
                type: "array",
                description: "The itinerary day by day",
                items: {
                  type: "object",
                  properties: {
                    day: {
                      type: "number",
                      description: "Day number",
                    },
                    activities: {
                      type: "object",
                      description:
                        "Activities spread over morning, afternoon and evening",
                      properties: {
                        morning: {
                          type: "string",
                          description: "Morning activities",
                        },
                        afternoon: {
                          type: "string",
                          description: "Afternoon activities",
                        },
                        evening: {
                          type: "string",
                          description: "Evening activities",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "generate_itinerary" } },
  })
  const toolCalls = gptResponse.choices[0].message.tool_calls || []
  const jsonified = JSON.parse(toolCalls[0].function.arguments)
  return jsonified.itinerary as ItineraryActivities[]
}
