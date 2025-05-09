import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProfileNav({
  username,
  active,
}: {
  username: string;
  active: "profile" | "snippets" | "collections";
}) {
  return (
    <div className="flex gap-2 items-center w-fit">
      <Link
        href={`/${username}`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-neutral-800 transition-colors",
          {
            "border-foreground hover:bg-transparent": active === "profile",
          }
        )}
      >
        Profile
      </Link>
      <Link
        href={`/${username}/snippets`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-neutral-800 transition-colors",
          {
            "border-foreground hover:bg-transparent": active === "snippets",
          }
        )}
      >
        Snippets
      </Link>
      <Link
        href={`/${username}/collections`}
        className={cn(
          "px-4 py-2 border-b border-transparent hover:bg-neutral-800 transition-colors",
          {
            "border-foreground hover:bg-transparent": active === "collections",
          }
        )}
      >
        Collections
      </Link>
    </div>
  );
}
