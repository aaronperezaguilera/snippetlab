"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { RelativeTime } from "./relative-time";
import { Bookmark } from "lucide-react";

import { Author } from "./author";
import { InferSelectModel } from "drizzle-orm";
import { collections, users } from "@/db/schema";

type Author = InferSelectModel<typeof users>;
type Collection = InferSelectModel<typeof collections>;

export function CollectionCard({
  author,
  collection,
  showAuthor = false,
  showUsername = false,
}: {
  author: Author;
  collection: Collection;
  showAuthor?: boolean;
  showUsername?: boolean;
}) {
  const { slug, title, visibility, bookmarksCount, createdAt } = collection;

  return (
    <div className="p-4 flex flex-col relative gap-4 border hover:bg-accent/5 transition-colors">
      <div className="flex flex-col gap-2">
        {showAuthor && <Author author={author} />}
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-bold">{title}</h2>
              <Badge variant="secondary" className="border border-neutral-700">
                {visibility[0].toUpperCase() + visibility.slice(1)}
              </Badge>
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-sm">
              <Bookmark size={16} /> {bookmarksCount} times saved
            </div>
          </div>
          {showUsername && (
            <div className="text-sm text-muted-foreground flex gap-1 items-center">
              @{author.username}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground flex justify-between ">
        <div>
          Created <RelativeTime datetime={createdAt} />
        </div>
      </div>

      <Link
        href={`/${author.username}/collections/${slug}`}
        className="absolute inset-0 z-40"
      />
    </div>
  );
}
