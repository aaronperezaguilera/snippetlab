"use client";

import { cn } from "@/lib/utils";
import { Code, History, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SnippetNav({
  username = "",
  snippet,
}: {
  username?: string;
  snippet?: string;
}) {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 items-center w-fit px-8">
      <Link
        href={`/${username}/snippets/${snippet}`}
        className={cn(
          "px-4 py-2 border-b border-transparent transition-colors flex gap-2 items-center",
          {
            "border-accent hover:bg-transparent":
              !pathname.includes("versions") && !pathname.includes("comments"),
            "hover:bg-neutral-800 rounded-sm":
              pathname.includes("versions") || pathname.includes("comments"),
          }
        )}
      >
        <Code size={16} /> Code
      </Link>
      <Link
        href={`/${username}/snippets/${snippet}/versions`}
        className={cn(
          "px-4 py-2 border-b border-transparent transition-colors flex gap-2 items-center",
          {
            "border-accent hover:bg-transparent": pathname.includes("versions"),
            "hover:bg-neutral-800 rounded-sm": !pathname.includes("versions"),
          }
        )}
      >
        <History size={16} /> Versions
      </Link>
      <Link
        href={`/${username}/snippets/${snippet}/comments`}
        className={cn(
          "px-4 py-2 border-b border-transparent transition-colors flex gap-2 items-center",
          {
            "border-accent hover:bg-transparent": pathname.includes("comments"),
            "hover:bg-neutral-800 rounded-sm": !pathname.includes("comments"),
          }
        )}
      >
        <MessageSquare size={16} />
        Comments
      </Link>
    </div>
  );
}
