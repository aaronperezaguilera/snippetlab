import { cn } from "@/lib/utils";
import { Code, History, MessageSquare } from "lucide-react";
import Link from "next/link";

export function SnippetNav({
  username = "",
  snippet,
  active,
}: {
  username?: string;
  snippet?: string;
  active?: "code" | "versions" | "comments";
}) {
  return (
    <div className="flex gap-2 items-center w-fit">
      <Link
        href={`/${username}/snippets/${snippet}`}
        className={cn(
          "px-4 py-2 border-b border-transparent transition-colors flex gap-2 items-center",
          {
            "border-foreground hover:bg-transparent": active === "code",
            "hover:bg-neutral-800": active && active !== "code",
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
            "border-foreground hover:bg-transparent": active === "versions",
            "hover:bg-neutral-800": active && active !== "versions",
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
            "border-foreground hover:bg-transparent": active === "comments",
            "hover:bg-neutral-800": active && active !== "comments",
          }
        )}
      >
        <MessageSquare size={16} />
        Comments
      </Link>
    </div>
  );
}
