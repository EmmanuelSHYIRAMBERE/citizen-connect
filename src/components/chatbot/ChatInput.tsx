"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { detectLanguage } from "@/services/TranslationService";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string, language: string) => void;
}) {
  const t = useTranslations("Chatbot");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const language = await detectLanguage(input);
    onSend(input, language);
    setInput("");
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("input_placeholder")}
        className="flex-1 border rounded-lg p-2 resize-none max-h-32"
        rows={1}
        aria-label={t("input_placeholder")}
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {t("send")}
      </button>
    </form>
  );
}
