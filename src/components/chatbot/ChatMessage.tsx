import { Message } from "@/types/chatTypes";
import { format } from "date-fns";

export default function ChatMessage({ message }: { message: Message }) {
  const isBot = message.sender === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
          isBot
            ? "bg-blue-100 text-blue-900 rounded-bl-none"
            : "bg-green-100 text-green-900 rounded-br-none"
        }`}
      >
        <div className="text-sm">{message.text}</div>
        <div
          className={`text-xs mt-1 ${
            isBot ? "text-blue-600" : "text-green-600"
          }`}
        >
          {format(new Date(message.timestamp), "HH:mm")}
        </div>
      </div>
    </div>
  );
}
