import { Button } from "../ui/button";
import Image from "next/image";

export function ForumCard() {
  return (
    <article className="border col-span-12 grid grid-cols-2 gap-8 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Q&A Forum</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Ask questions directly in any snippet and get answers from the
          community. Embed code in your questions and solutions to discuss real
          programming challenges.
        </p>
      </div>
      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col gap-4 relative">
        <div className="flex flex-col gap-4">
          <div className="px-2">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className={`pr-4 pl-2 py-2 h-full -translate-x-2 w-fit z-50`}
              >
                <Image
                  src="/jane.webp"
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-sm overflow-hidden"
                />
                <div className="flex flex-col">
                  <span>Jane Doe</span>
                  <span>@janedoe</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-sm bg-card flex flex-col relative gap-4 hover:bg-neutral-800 transition-colors">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center justify-between">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    How do I use the Monaco editor with React?
                  </h2>

                  <div className="text-sm text-muted-foreground text-nowrap">
                    Posted 1 minute ago
                  </div>
                </div>
                <p className="line-clamp-2">
                  I&apos;m trying to integrate Monaco editor into my React
                  project. What is the recommended way to set it up and handle
                  syntax highlighting?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-2">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className={`pr-4 pl-2 py-2 h-full -translate-x-2 w-fit z-50`}
              >
                <Image
                  src="/john.webp"
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-sm overflow-hidden"
                />
                <div className="flex flex-col">
                  <span>John Doe</span>
                  <span>@johndoe</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-sm bg-card flex flex-col relative gap-4 hover:bg-neutral-800 transition-colors">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center justify-between">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    What&apos;s the best way to debounce a function in
                    JavaScript?
                  </h2>

                  <div className="text-sm text-muted-foreground text-nowrap">
                    Posted 15 minute ago
                  </div>
                </div>
                <p className="line-clamp-2">
                  I need to limit how often a heavy computation function runs
                  when responding to rapid events (like window resizing).
                  What&apos;s a clean way to implement debounce in plain
                  JavaScript or using lodash?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full"></div>
      </div>
    </article>
  );
}
