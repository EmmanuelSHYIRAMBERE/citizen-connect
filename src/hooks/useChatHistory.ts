import { Message } from "@/types/chatTypes";
import { getStorage, setStorage } from "@/services/storageService";
import { useCallback } from "react";

export default function useChatHistory() {
  const saveChat = useCallback(async (messages: Message[]) => {
    try {
      await setStorage("chatHistory", messages);
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, []);

  const loadChat = useCallback(async (): Promise<Message[]> => {
    try {
      const history = await getStorage<Message[]>("chatHistory");
      return history || [];
    } catch (error) {
      console.error("Failed to load chat history:", error);
      return [];
    }
  }, []);

  return { saveChat, loadChat };
}
