"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Cpu, Sparkles, Stars } from "lucide-react";

export type ModelType = "grok" | "claude" | "gpt4o" | "gpt4o-mini";

interface ModelSelectorProps {
  activeModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

export function ModelSelector({ activeModel, onModelChange }: ModelSelectorProps) {
  return (
    <Tabs value={activeModel} onValueChange={(value) => onModelChange(value as ModelType)} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="grok" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Grok
        </TabsTrigger>
        <TabsTrigger value="claude" className="flex items-center gap-2">
          <Stars className="h-4 w-4" />
          Claude
        </TabsTrigger>
        <TabsTrigger value="gpt4o-mini" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          GPT 4o mini
        </TabsTrigger>
        <TabsTrigger value="gpt4o" className="flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          GPT 4o
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
