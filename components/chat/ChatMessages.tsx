"use client";

import { useEffect, useRef } from "react";
import { Message } from "ai/react";
import { ChatMessage } from "./ChatMessage";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto h-full">
      <div className="flex-1" />
      {messages.map((message, i) => (
        <ChatMessage key={i} message={message} />
      ))}
      <div ref={messagesEndRef} />
      <div className="h-1 bg-gradient-to-b from-transparent to-background absolute bottom-0 left-0 right-0 pointer-events-none" />
    </div>
  );
}
