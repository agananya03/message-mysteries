import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Stream text directly from the model
    const result = await streamText({
      model: openai("gpt-3.5-turbo"), 
      messages,
    });

    // Return the streaming response
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        name: error.name,
        status: error.status || 500,
        message: error.message || "Unexpected error",
        headers: error.headers || {},
      },
      { status: error.status }
    );
  }
}
