import { CodeReader } from "@/components/code-reader";
import { ProfileNav } from "@/components/profile-nav";
import { LANGUAGE_ICON } from "@/config";
import { db } from "@/db/drizzle";
import { pins, snippets, stars, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ShareButton } from "@/components/share";
import { PinButton } from "@/components/pin-button";
import { StarButton } from "@/components/star-button";

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
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author[0].id)))
    .execute();

  const currentSnippet = snippet[0];
  if (snippet.length === 0) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  const pinnedSnippets = await db
    .select()
    .from(pins)
    .where(
      and(eq(pins.snippetId, currentSnippet.id), eq(pins.userId, author[0].id))
    );

  let pinned = false;
  if (pinnedSnippets.length > 0) {
    pinned = true;
  }

  const starredSnippets = await db
    .select()
    .from(stars)
    .where(
      and(
        eq(stars.snippetId, currentSnippet.id),
        eq(stars.userId, author[0].id)
      )
    );
  let starred = false;
  if (starredSnippets.length > 0) {
    starred = true;
  }

  const starsCount = await db
    .select()
    .from(stars)
    .where(eq(stars.snippetId, currentSnippet.id));

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
    <main className="container mx-auto mt-16 grid grid-cols-[1fr_3fr] gap-16 ">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <span className="text-muted-foreground">Author</span>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            asChild
            className="pr-4 pl-2 py-2 h-full -translate-x-2"
          >
            <Link
              href={`/${author[0].username}`}
              className="flex gap-3 items-center"
            >
              {author[0]?.image_url && (
                <Image
                  src={author[0]?.image_url}
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-12 h-12 object-cover"
                />
              )}
              <div className="flex flex-col">
                <span>
                  {author[0].first_name} {author[0].last_name}
                </span>
                <span>@{author[0].username}</span>
              </div>
            </Link>
          </Button>
        </div>
        {currentSnippet.tags && currentSnippet.tags.length > 0 && (
          <>
            <span className="text-muted-foreground">Tags</span>
            <div className="flex gap-2">
              {currentSnippet.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border border-neutral-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <ProfileNav active="snippets" username={username} />
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
                <PinButton id={currentSnippet.id} initialPinned={pinned} />
              )}
              {currentSnippet.visibility === "public" && (
                <>
                  <ShareButton />
                  <StarButton
                    id={currentSnippet.id}
                    initialStarred={starred}
                    initialStars={starsCount.length}
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
        <h2 className="text-2xl font-bold mb-2">Summary</h2>
        <p>
          {currentSnippet.summary
            ? currentSnippet.summary
            : "No summary provided."}
        </p>
      </section>
    </main>
  );
}
