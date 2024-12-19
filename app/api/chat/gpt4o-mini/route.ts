import { SECRET_PROMPT, SYSTEM_PROMPT } from "@/lib/constants";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [{ role: "system", content: SECRET_PROMPT }, { role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("GPT-4 Turbo API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
