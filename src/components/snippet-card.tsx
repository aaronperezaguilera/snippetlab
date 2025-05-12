"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { LANGUAGE_ICON } from "@/config";
import { RelativeTime } from "./relative-time";
import { Pin } from "lucide-react";
import CopyButton from "./copy-button";

// Import sólo lectura
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

export function SnippetCard({
  username,
  slug,
  code,
  title,
  visibility,
  language,
  updatedAt,
  isPinned,
}: {
  username: string;
  slug: string;
  code: string;
  title: string;
  visibility: string;
  language: string;
  updatedAt: Date;
  isPinned?: boolean;
}) {
  return (
    <div className="bg-[#061626] p-4 flex flex-col relative rounded-lg gap-4">
      <div className="flex justify-between items-center ">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <Badge variant="secondary" className="border border-neutral-700">
            {visibility[0].toUpperCase() + visibility.slice(1)}
          </Badge>
        </div>
        {isPinned && <Pin fill="currentColor" />}
      </div>

      {/* Código con highlight */}
      <div className="relative rounded-lg overflow-hidden">
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
            borderRadius: "0.5rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Pie con idioma y fecha */}
      <div className="text-sm text-muted-foreground flex justify-between ">
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4">{LANGUAGE_ICON[language]}</div>
          <span>{language[0].toUpperCase() + language.slice(1)}</span>
        </div>
        <div>
          Updated <RelativeTime datetime={updatedAt} />
        </div>
      </div>

      {/* Link “invisible” */}
      <Link
        href={`/${username}/snippets/${slug}`}
        className="absolute inset-0 z-40"
      />
    </div>
  );
}
