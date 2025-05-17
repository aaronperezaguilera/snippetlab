"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useFormStatus } from "react-dom";
import { createAISnippet } from "@/app/[username]/snippets/new/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function GenerateAISnippet() {
  return (
    <form action={createAISnippet} className="relative">
      <Textarea
        placeholder="Describe your snippet"
        className="resize-none pr-16 max-h-24 h-full"
        maxLength={300}
        name="prompt"
        required
      />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SubmitButton />
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            Click to generate snippet
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size="icon"
      type="submit"
      disabled={pending}
      className="absolute top-3 right-3 bg-gradient-to-br from-primary via-blue-700/80 to-purple-800 text-white hover:from-blue-800/80 hover:to-purple-800/80 transition-colors duration-500"
    >
      {pending ? (
        <Loader2 className="animate-spin"></Loader2>
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
    </Button>
  );
}
