"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ChatInput({ input, isLoading, onSubmit, onInputChange }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  // Auto-focus when loading stops
  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        const form = e.currentTarget.form;
        form?.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 min-h-[44px] max-h-[200px] resize-none py-3"
        rows={1}
      />
      <Button type="submit" disabled={isLoading || !input.trim()}>
        <Send className="w-4 h-4 mr-2" />
        Send
      </Button>
    </form>
  );
}
