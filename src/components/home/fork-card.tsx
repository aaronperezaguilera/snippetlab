import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitFork } from "lucide-react";
import Image from "next/image";

export function ForkCard() {
  return (
    <article className="border flex flex-col gap-8 col-span-4 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Fork & Collaborate</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Like a snippet from another user? Fork it to duplicate it in your
          account, modify what you need and contribute back or create your own
          improved version.
        </p>
      </div>

      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col gap-4 relative">
        <TooltipProvider delayDuration={0}>
          <Tooltip open>
            <TooltipTrigger asChild>
              <Button variant="secondary" className="w-fit">
                <GitFork /> Fork
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs" side="right">
              Click to create a fork
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="w-2/3 self-end">
          <Image
            src="/fork.png"
            width={1920}
            height={1080}
            alt="Preview image"
            className="scale-150 translate-y-10"
          />
        </div>
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full z-50"></div>
      </div>
    </article>
  );
}
