"use client";

import { useChat } from "ai/react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessages } from "./chat/ChatMessages";
import { ModelSelector, ModelType } from "./chat/ModelSelector";
import { useState } from "react";

export default function Chat() {
  const [activeModel, setActiveModel] = useState<ModelType>("grok");

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `/api/chat/${activeModel}`,
  });

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-5xl mx-auto">
      <div className="p-4">
        <ModelSelector activeModel={activeModel} onModelChange={setActiveModel} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <div className="p-4">
        <ChatInput input={input} isLoading={isLoading} onSubmit={handleSubmit as any} onInputChange={handleInputChange} />
      </div>
    </div>
  );
}
