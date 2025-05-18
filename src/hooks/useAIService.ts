import { getComplaintCategory } from "@/lib/utils/complaintUtils";
import { analyzeSentiment } from "@/lib/utils/sentimentAnalysis";
import { translateText } from "@/services/TranslationService";
import { Message } from "@/types/chatTypes";
import { useState, useCallback } from "react";

export default function useAIService() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string, language: string, history: Message[]) => {
      setIsLoading(true);

      try {
        const sentiment = analyzeSentiment(text);
        const category = getComplaintCategory(text);

        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            language,
            history,
            sentiment,
            category,
          }),
        });

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();

        let responseText = data.text;
        if (data.language !== language) {
          responseText = await translateText(
            data.text,
            data.language,
            language
          );
        }

        return {
          text: responseText,
          language,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { sendMessage, isLoading };
}
