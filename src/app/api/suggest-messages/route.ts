import OpenAI from "openai";
import {OpenAIStream, StreaminTextResponse} from 'ai'
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
export const runtime = 'edge'
export async function POST(request: Request) {
    try {
        const {messages} = await request.json()
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages,
        })
        const stream = OpenAIStream(response);
        return new StreaminTextResponse(stream);
    } catch (error) {
        if(error instanceof OpenAI.APIError) {
            const {name, status, headers, message} = error
            return NextResponse.json({
                name, status, headers, message
            })
        } else {
            console.log("An unexpected error occured: ", error)
            throw error
        }
    }
}