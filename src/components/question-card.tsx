"use client";

import Link from "next/link";
import { LANGUAGE_ICON } from "@/config";
import { RelativeTime } from "./relative-time";
import CopyButton from "./copy-button";

// Import sólo lectura
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Author } from "./author";
import { InferSelectModel } from "drizzle-orm";
import { questions, snippets, users } from "@/db/schema";

type Author = InferSelectModel<typeof users>;
type Snippet = InferSelectModel<typeof snippets>;
type Question = InferSelectModel<typeof questions>;

export function QuestionCard({
  author,
  snippet,
  question,
  showAuthor = true,
}: {
  author: Author;
  snippet?: Snippet;
  question: Question;
  showAuthor?: boolean;
  showUsername?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {showAuthor && author && (
        <div className="px-2">
          <Author author={author} />
        </div>
      )}
      <div className="p-4 border rounded-sm bg-card flex flex-col relative gap-4 hover:bg-neutral-800 transition-colors">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center justify-between">
              <h2 className="text-lg font-semibold line-clamp-1">
                {question.title}
              </h2>

              <div className="text-sm text-muted-foreground text-nowrap">
                Posted <RelativeTime datetime={question.createdAt} />
              </div>
            </div>
            <p className="line-clamp-2">{question.content}</p>
          </div>
        </div>

        {snippet && (
          <>
            <div className="shadow-lg shadow-background overflow-hidden">
              <div className="px-4 bg-[#28292c] py-2 border-b border-b-primary/10">
                {snippet.filename}
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1e1e1e] to-transparent z-40" />
                <CopyButton
                  value={snippet.code}
                  className="absolute z-50 right-3 top-3"
                />

                <SyntaxHighlighter
                  language={snippet.language}
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
                    fontSize: "14px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </>
        )}

        {snippet && (
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4">{LANGUAGE_ICON[snippet.language]}</div>
            <span>
              {snippet.language[0].toUpperCase() + snippet.language.slice(1)}
            </span>
          </div>
        )}
        <Link
          href={`/forum/${question.id}`}
          className="absolute inset-0 z-40"
        />
      </div>
    </div>
  );
}
