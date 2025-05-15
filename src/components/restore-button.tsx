"use client";

import { RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { restoreSnippetVersion } from "@/app/[username]/snippets/[slug]/(snippet)/versions/actions";
import { useFormStatus } from "react-dom";

export function RestoreButton({
  snippetId,
  versionId,
  className,
}: {
  snippetId: number;
  versionId: number;
  className?: string;
}) {
  const restoreAction = async () => {
    await restoreSnippetVersion(snippetId, versionId);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={restoreAction}>
            <SubmitButton className={className} />
          </form>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          Click to restore
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SubmitButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("disabled:bg-muted", className)}
      disabled={pending}
    >
      <RotateCcw
        size={16}
        aria-hidden="true"
        className={pending ? "animate-spin" : ""}
      />
    </Button>
  );
}
