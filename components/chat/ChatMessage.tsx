"use client";

import { MessageCircle, Shield } from "lucide-react";
import { Message } from "ai/react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex items-start gap-4 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        {isAssistant ? <Shield className="w-4 h-4 text-primary-foreground" /> : <MessageCircle className="w-4 h-4 text-primary-foreground" />}
      </div>
      <div className={`flex-1 rounded-lg p-4 ${isAssistant ? "bg-muted" : "bg-primary text-primary-foreground"}`}>{message.content}</div>
    </div>
  );
}
