import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface History {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  language: string;
}

export async function POST(req: Request) {
  try {
    const { message, language, history, sentiment, category } =
      await req.json();

    // Create context-aware prompt
    const prompt = createPrompt(
      message,
      language,
      history,
      sentiment,
      category
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      text:
        response.choices[0]?.message?.content ||
        "I couldn't generate a response.",
      language,
    });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}

function createPrompt(
  message: string,
  language: string,
  history: History[],
  sentiment: string,
  category?: string
) {
  return `
  You are a helpful assistant for a citizen engagement platform in Rwanda. 
  Respond in ${language} unless the user asks for another language.
  Current conversation sentiment: ${sentiment}.
  ${category ? `This appears to be about: ${category}.` : ""}
  
  Previous messages:
  ${history.map((m) => `${m.sender}: ${m.text}`).join("\n")}
  
  User message: ${message}
  
  Your response (in ${language}):
  `;
}
