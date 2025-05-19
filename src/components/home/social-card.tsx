import Image from "next/image";
import { Icons } from "../ui/icons";
import { Link } from "lucide-react";

export function SocialCard() {
  return (
    <article className="border flex flex-col gap-8 col-span-8 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Social Feed & Following</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Follow other developers and discover their work in your personalized
          feed. Keep up to date with new snippets, likes and forks from the
          people who inspire you.
        </p>
      </div>
      <div className="px-16 relative">
        <div className="flex gap-8">
          <div className="aspect-square bg-neutral-600 overflow-hidden w-64 h-64 flex-shrink-0">
            <Image
              src="/jane.webp"
              width={1000}
              height={1000}
              alt="Profile"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between w-full gap-8">
              <div className="space-y-4 max-w-[60ch] text-pretty">
                <div>
                  <h1 className="text-2xl font-semibold">Jane Doe</h1>
                  <p className="text-muted-foreground">@janedoe</p>
                </div>
                <p>
                  Hi there! I’m Jane Doe, a front‑end engineer with 5+ years of
                  experience crafting responsive, accessible web apps. I
                  specialize in React and TypeScript.
                </p>

                <div className="text-muted-foreground">
                  151 followers · 214 following
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://dotmd.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
                >
                  <Link className="size-4" /> Website
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
                >
                  <Icons.gitHub className="size-4" /> GitHub
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
                >
                  <Icons.x className="size-4" /> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full z-50"></div>
      </div>
    </article>
  );
}
