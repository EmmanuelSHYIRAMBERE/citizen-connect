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

// Static responses for common queries in multiple languages
const STATIC_RESPONSES: Record<string, Record<string, string>> = {
  "en-US": {
    hello: "Hello! Welcome to CitizenConnect. How can I assist you today?",
    hi: "Hi there! How can I help you with citizen services today?",
    help: "I can help you with submitting complaints, checking complaint status, or answering questions about public services. What do you need help with?",
    complaint:
      "I can help you submit a complaint. Would you like to: [1] Submit a new complaint or [2] Check existing complaints?",
    thanks: "You're welcome! Is there anything else I can help you with?",
    goodbye: "Goodbye! Feel free to return if you have more questions.",
  },
  fr: {
    hello:
      "Bonjour! Bienvenue sur CitizenConnect. Comment puis-je vous aider aujourd'hui?",
    hi: "Salut! Comment puis-je vous aider avec les services citoyens aujourd'hui?",
    help: "Je peux vous aider à soumettre des réclamations, vérifier l'état d'une réclamation ou répondre à des questions sur les services publics. De quoi avez-vous besoin?",
    complaint:
      "Je peux vous aider à soumettre une réclamation. Souhaitez-vous: [1] Soumettre une nouvelle réclamation ou [2] Vérifier les réclamations existantes?",
    thanks: "Je vous en prie! Puis-je vous aider avec autre chose?",
    goodbye:
      "Au revoir! N'hésitez pas à revenir si vous avez d'autres questions.",
  },
  rw: {
    hello:
      "Murakaza neza! Mwakiriye kuri CitizenConnect. Nshobora kugufasha iki?",
    hi: "Mwiriwe! Nshobora kugufasha gute muri serivisi z'abaturage uyu munsi?",
    help: "Nshobora kugufasha gutanga ibirego, kureba imimerere y'ikirego, cyangwa gusubiza ibibazo kuri serivisi z'abaturage. Ni iki ushaka?",
    complaint:
      "Nshobora kugufasha gutanga ikirego. Urashaka: [1] Gutanga ikirego gishya cyangwa [2] Kureba ibirego birimo?",
    thanks: "Wakiriwe! Hari ikindi nshobora kugufasha?",
    goodbye: "Murabe! Uzabyuka niba ufite ibindi bibazo.",
  },
};

// Common queries that should trigger static responses
const COMMON_QUERIES = [
  "hello",
  "hi",
  "hey",
  "help",
  "complaint",
  "thanks",
  "thank you",
  "bye",
  "goodbye",
];

export async function POST(req: Request) {
  try {
    const { message, language, history, sentiment, category } =
      await req.json();

    // Check if message matches any common queries
    const normalizedMessage = message.toLowerCase().trim();
    const staticResponseKey = COMMON_QUERIES.find((query) =>
      normalizedMessage.includes(query)
    );

    if (staticResponseKey && STATIC_RESPONSES[language]?.[staticResponseKey]) {
      return NextResponse.json({
        text: STATIC_RESPONSES[language][staticResponseKey],
        language,
        isStatic: true, // Flag to indicate this is a static response
      });
    }

    // For complaint-related queries, provide structured options
    if (
      normalizedMessage.includes("complaint") ||
      normalizedMessage.includes("ikirego") ||
      normalizedMessage.includes("réclamation")
    ) {
      return NextResponse.json({
        text: STATIC_RESPONSES[language]["complaint"],
        language,
        isStatic: true,
        options: [
          {
            text:
              language === "en-US"
                ? "Submit New Complaint"
                : language === "fr"
                ? "Soumettre une nouvelle plainte"
                : "Tanga Ikirego Gishya",
            action: "new_complaint",
          },
          {
            text:
              language === "en-US"
                ? "View Existing Complaints"
                : language === "fr"
                ? "Afficher les plaintes existantes"
                : "Reba ibirego biriho",
            action: "view_complaints",
          },
        ],
      });
    }

    // Create context-aware prompt for dynamic responses
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
        STATIC_RESPONSES[language]?.["error"] ||
        "I couldn't generate a response.",
      language,
      isStatic: false,
    });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        text: "Sorry, I encountered an error. Please try again.",
      },
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
  
  Keep responses concise and practical. For complaint-related queries, guide users 
  through the process but don't simulate the actual form submission.
  
  If asked about complaint status, explain they can check in the complaints section.
  
  Previous messages:
  ${history.map((m) => `${m.sender}: ${m.text}`).join("\n")}
  
  User message: ${message}
  
  Your response (in ${language}):
  `;
}
