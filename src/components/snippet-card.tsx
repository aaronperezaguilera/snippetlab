"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { LANGUAGE_ICON } from "@/config";
import { RelativeTime } from "./relative-time";
import { Heart } from "lucide-react";
import CopyButton from "./copy-button";

// Import sólo lectura
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Author } from "./author";
import { InferSelectModel } from "drizzle-orm";
import { snippets, users } from "@/db/schema";

type Author = InferSelectModel<typeof users>;
type Snippet = InferSelectModel<typeof snippets>;

export function SnippetCard({
  author,
  snippet,
  showAuthor = false,
  showCode = true,
}: {
  author: Author;
  snippet: Snippet;
  showAuthor?: boolean;
  showCode?: boolean;
}) {
  const {
    slug,
    title,
    filename,
    code,
    language,
    visibility,
    updatedAt,
    likesCount,
  } = snippet;

  return (
    <div className="bg-[#05101b] p-4 flex flex-col relative rounded-lg gap-4 hover:bg-accent/5 transition-colors">
      <div className="flex flex-col gap-2">
        {showAuthor && <Author author={author} />}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h2 className="text-lg font-bold">{title}</h2>
            <Badge variant="secondary" className="border border-neutral-700">
              {visibility[0].toUpperCase() + visibility.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-sm">
            <Heart size={16} /> {likesCount} likes
          </div>
        </div>
      </div>

      {showCode && (
        <div>
          <div className="px-4 bg-[#05121f] rounded-t-lg py-2 border-b border-b-primary/10">
            {filename}
          </div>
          <div className="relative rounded-b-lg overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#061626] to-transparent z-40" />
            <CopyButton value={code} className="absolute z-50 right-3 top-3" />

            <SyntaxHighlighter
              language={language}
              style={nightOwl}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                padding: "1rem",
                minHeight: "10rem",
                maxHeight: "10rem",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: "14px",
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground flex justify-between ">
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4">{LANGUAGE_ICON[language]}</div>
          <span>{language[0].toUpperCase() + language.slice(1)}</span>
        </div>
        <div>
          Updated <RelativeTime datetime={updatedAt} />
        </div>
      </div>

      <Link
        href={`/${author.username}/snippets/${slug}`}
        className="absolute inset-0 z-40"
      />
    </div>
  );
}
