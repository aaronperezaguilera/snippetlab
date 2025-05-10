import Link from "next/link";
import { Badge } from "./ui/badge";
import { LANGUAGE_ICON } from "@/config";
import { RelativeTime } from "./relative-time";
import { Pin } from "lucide-react";

export function SnippetCard({
  username,
  slug,
  title,
  visibility,
  language,
  updatedAt,
  isPinned,
}: {
  username: string;
  slug: string;
  title: string;
  visibility: string;
  language: string;
  updatedAt: Date;
  isPinned: boolean;
}) {
  return (
    <Link
      href={`/${username}/snippets/${slug}`}
      className="p-4 border bg-card flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <Badge variant="secondary" className="border border-neutral-700">
            {visibility.slice(0, 1).toUpperCase() + visibility.slice(1)}
          </Badge>
        </div>
        {isPinned && <Pin fill="currentColor" />}
      </div>
      <div className="text-sm text-muted-foreground flex justify-between">
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4">{LANGUAGE_ICON[language]}</div>
          <span>{language.slice(0, 1).toUpperCase() + language.slice(1)}</span>
        </div>

        <div>
          Updated <RelativeTime datetime={updatedAt} />
        </div>
      </div>
    </Link>
  );
}
