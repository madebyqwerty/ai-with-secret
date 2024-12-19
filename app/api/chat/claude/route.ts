import { streamText } from "ai";
import { NextRequest } from "next/server";
import { SECRET_PROMPT, SYSTEM_PROMPT } from "@/lib/constants";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await streamText({
      model: anthropic("claude-3-sonnet-20240229"),
      messages: [{ role: "system", content: SECRET_PROMPT }, { role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.error("Claude API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
