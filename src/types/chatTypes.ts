export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  actions?: { text: string; url: string }[];
  timestamp: string;
  language: string;
}

export interface ChatHistory {
  messages: Message[];
  lastUpdated: string;
}

export interface AIServiceResponse {
  text: string;
  language: string;
  sentiment?: string;
  category?: string;
}

export interface ChatResponse extends AIServiceResponse {
  history: Message[];
}
