import { CodeReader } from "@/components/code-reader";
import { LANGUAGE_ICON } from "@/config";
import { db } from "@/db/drizzle";
import { snippets, stars, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ShareButton } from "@/components/share";
import { PinButton } from "@/components/pin-button";
import { StarButton } from "@/components/star-button";
import { SnippetNav } from "@/components/snippet-nav";

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;

  const authenticatedUser = await currentUser();

  const author = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const snippet = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author[0].id)));

  const currentSnippet = snippet[0];

  if (snippet.length === 0) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  const starredSnippets = await db
    .select()
    .from(stars)
    .where(
      and(
        eq(stars.snippetId, currentSnippet.id),
        eq(stars.userId, authenticatedUser?.id || "")
      )
    );

  if (
    currentSnippet.visibility === "private" &&
    authenticatedUser?.id !== author[0].id
  ) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 px-16">
      <SnippetNav
        active="code"
        username={username}
        snippet={currentSnippet.slug}
      />
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-bold">{currentSnippet.title}</h1>
            <Badge variant="secondary" className="border border-neutral-700">
              {currentSnippet.visibility.slice(0, 1).toUpperCase() +
                currentSnippet.visibility.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            {author[0].id === authenticatedUser?.id && (
              <PinButton
                id={currentSnippet.id}
                initialPinned={currentSnippet.pinned}
              />
            )}
            {currentSnippet.visibility === "public" && (
              <>
                <ShareButton />
                <StarButton
                  id={currentSnippet.id}
                  initialStarred={starredSnippets.length > 0}
                  initialStars={currentSnippet.starsCount}
                />
              </>
            )}

            {author[0].id === authenticatedUser?.id && (
              <Button asChild>
                <Link
                  href={`/${username}/snippets/${currentSnippet.slug}/edit`}
                >
                  <Edit /> Edit
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm text-muted-foreground">
          {LANGUAGE_ICON[currentSnippet.language]}
          {currentSnippet.language.slice(0, 1).toUpperCase() +
            currentSnippet.language.slice(1)}
        </div>
      </header>
      <CodeReader
        language={currentSnippet.language}
        code={currentSnippet.code}
      />
    </section>
  );
}
