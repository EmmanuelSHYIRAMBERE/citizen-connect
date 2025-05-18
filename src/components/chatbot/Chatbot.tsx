"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import useChatHistory from "@/hooks/useChatHistory";
import useAIService from "@/hooks/useAIService";
import ChatHeader from "./ChatHeader";
import { Message } from "@/types/chatTypes";
import { messageVariants } from "../animations/messageVariants";
import { TypingIndicator } from "../animations/typingIndicator";
import { Motion } from "../animations/MotionWrapper";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Chatbot() {
  const t = useTranslations("Chatbot");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { saveChat, loadChat } = useChatHistory();
  const { sendMessage } = useAIService();

  // Memoize the initial message to prevent recreation on every render
  const initialMessage = useCallback(
    () => ({
      id: "1",
      text: t("welcome_message"),
      sender: "bot" as const,
      timestamp: new Date().toISOString(),
      language: "en-US",
    }),
    [t]
  );

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const history = await loadChat();
      if (history.length > 0) {
        setMessages(history);
      } else {
        setMessages([initialMessage()]);
      }
    };
    loadHistory();
  }, [loadChat, initialMessage]);

  // Save chat when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChat(messages);
    }
  }, [messages, saveChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string, language: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
      language,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Check if message contains complaint-related keywords
      const isComplaintRelated = /complaint|issue|problem|report/i.test(text);

      let botResponse;
      if (isComplaintRelated) {
        botResponse = {
          text: t("complaint_redirect_message"),
          language,
          actions: [
            { text: t("new_complaint"), url: "/complaints/new" },
            { text: t("view_complaints"), url: "/complaints" },
          ],
        };
      } else {
        botResponse = await sendMessage(text, language, messages);
      }

      if ("actions" in botResponse) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: botResponse.text,
            sender: "bot",
            timestamp: new Date().toISOString(),
            language: botResponse.language,
            actions: botResponse.actions,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: botResponse.text,
            sender: "bot",
            timestamp: new Date().toISOString(),
            language: botResponse.language,
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: t("error_message"),
          sender: "bot",
          timestamp: new Date().toISOString(),
          language,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span>{t("ask_ai")}</span>
        </Motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 w-full max-w-md h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 overflow-hidden"
          >
            <ChatHeader onClose={() => setIsOpen(false)} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <Motion.div
                    key={message.id}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={messageVariants}
                    layout
                  >
                    <ChatMessage message={message} />
                    {message.actions && (
                      <div className="flex gap-2 mt-2 ml-12">
                        {message.actions.map((action, i) => (
                          <Link key={i} href={action.url} passHref>
                            <Button variant="outline" size="sm">
                              {action.text}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </Motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="flex items-center p-2">
                  <TypingIndicator />
                  <span className="ml-2 text-gray-500">{t("typing")}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <ChatInput onSend={handleSendMessage} />
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
