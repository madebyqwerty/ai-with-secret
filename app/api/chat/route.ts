import { streamText } from "ai";
import { NextRequest } from "next/server";
import { SYSTEM_PROMPT, SECRET_PROMPT } from "@/lib/constants";
import { xai } from "@ai-sdk/xai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    if (process.env.NEXT_PUBLIC_ENABLE_SECURITY_LOGGING === "true") {
      console.log(`[${new Date().toISOString()}] Chat request:`, {
        message: lastMessage,
      });
    }

    const response = await streamText({
      model: xai("grok-2-1212"),
      messages: [{ role: "system", content: SECRET_PROMPT }, { role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.log("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
