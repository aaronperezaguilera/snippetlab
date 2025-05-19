import { Folder } from "lucide-react";
import { Badge } from "../ui/badge";

export function CollectionsCard() {
  return (
    <article className="border flex flex-col gap-8 col-span-4 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Organize into Collections</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Group your snippets in public or private collections. Create thematic
          folders (API Helpers, UI Components...) and keep your code library
          perfectly organized and accessible.
        </p>
      </div>
      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col gap-4 relative">
        <div className="p-4 flex items-center relative gap-4 rounded-sm border bg-card hover:bg-neutral-800 transition-colors">
          <Folder className="size-10 fill-[#fafafa]" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <h2 className="text-lg font-semibold">React Hooks</h2>
                    <Badge
                      variant="secondary"
                      className="border border-neutral-700"
                    >
                      Public
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex justify-between ">
              <div>Created now</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center relative gap-4 rounded-sm border bg-card hover:bg-neutral-800 transition-colors">
          <Folder className="size-10 fill-[#fafafa]" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <h2 className="text-lg font-semibold">JS Utilities</h2>
                    <Badge
                      variant="secondary"
                      className="border border-neutral-700"
                    >
                      Private
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex justify-between ">
              <div>Created 2 days ago</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center relative gap-4 rounded-sm border bg-card hover:bg-neutral-800 transition-colors">
          <Folder className="size-10 fill-[#fafafa]" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <h2 className="text-lg font-semibold">Bash Scripts</h2>
                    <Badge
                      variant="secondary"
                      className="border border-neutral-700"
                    >
                      Public
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex justify-between ">
              <div>Created 3 days ago</div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full"></div>
      </div>
    </article>
  );
}
