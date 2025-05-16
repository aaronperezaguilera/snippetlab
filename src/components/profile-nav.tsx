"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileNav({ username = "" }: { username?: string }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center w-fit">
      <Link
        href={`/${username}`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-accent/10 transition-colors",
          {
            "border-accent hover:bg-transparent": pathname === `/${username}`,
          }
        )}
      >
        Profile
      </Link>
      <Link
        href={`/${username}/snippets`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-accent/10 transition-colors",
          {
            "border-accent hover:bg-transparent": pathname.includes(
              `/${username}/snippets`
            ),
          }
        )}
      >
        Snippets
      </Link>
      <Link
        href={`/${username}/collections`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-accent/10 transition-colors",
          {
            "border-accent hover:bg-transparent": pathname.includes(
              `/${username}/collections`
            ),
          }
        )}
      >
        Collections
      </Link>
      <Link
        href={`/${username}/likes`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-accent/10 transition-colors",
          {
            "border-accent hover:bg-transparent": pathname.includes(
              `/${username}/likes`
            ),
          }
        )}
      >
        Likes
      </Link>
      <Link
        href={`/${username}/questions`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-accent/10 transition-colors",
          {
            "border-accent hover:bg-transparent": pathname.includes(
              `/${username}/questions`
            ),
          }
        )}
      >
        Questions
      </Link>
    </div>
  );
}
