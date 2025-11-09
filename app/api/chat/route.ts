import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });

    return NextResponse.json(response.text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
