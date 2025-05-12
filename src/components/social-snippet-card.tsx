"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { LANGUAGE_ICON } from "@/config";
import { RelativeTime } from "./relative-time";
import { Star } from "lucide-react";
import CopyButton from "./copy-button";

// Import sólo lectura
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { type InferSelectModel } from "drizzle-orm";
import { users } from "@/db/schema";
import { Author } from "./author";

type User = InferSelectModel<typeof users>;

export function SocialSnippetCard({
  user,
  slug,
  code,
  title,
  visibility,
  language,
  updatedAt,
  starsCount,
}: {
  user: User;
  slug: string;
  code: string;
  title: string;
  visibility: string;
  language: string;
  updatedAt: Date;
  starsCount?: number;
}) {
  return (
    <div className="p-4 flex flex-col gap-4 relative hover:bg-neutral-900 transition-colors">
      <div className="flex justify-between items-center">
        <Author author={user} />
        <div className="text-sm flex-col  text-muted-foreground flex items-end gap-2">
          <div>
            Updated <RelativeTime datetime={updatedAt} />
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4">{LANGUAGE_ICON[language]}</div>
            <span>{language[0].toUpperCase() + language.slice(1)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <Badge variant="secondary" className="border border-neutral-700">
            {visibility[0].toUpperCase() + visibility.slice(1)}
          </Badge>
        </div>
        <div className="flex gap-2 items-center text-muted-foreground">
          <Star size={20} /> {starsCount} stars
        </div>
      </div>

      {/* Código con highlight */}
      <div className="relative">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1e1e1e] to-transparent z-40" />
        <CopyButton value={code} className="absolute z-50 right-3 top-3" />

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={false}
          customStyle={{
            margin: 0,
            padding: "1rem",
            minHeight: "10rem",
            maxHeight: "10rem",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Pie con idioma y fecha */}

      {/* Link “invisible” */}
      <Link
        href={`/${user.username}/snippets/${slug}`}
        className="absolute inset-0 z-40"
      />
    </div>
  );
}
