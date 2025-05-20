import { db } from "@/db/drizzle";
import {
  collections,
  collectionSnippets,
  likes,
  snippets,
  users,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { EXAMPLE_SITE_ICONS } from "@/config";
import { SnippetNav } from "@/components/snippet-nav";
import { LANGUAGE_ICON } from "@/config";
import { Edit, GitFork } from "lucide-react";
import { ShareButton } from "@/components/share";
import { PinSnippetButton } from "@/components/pin-snippet-button";
import { StarButton } from "@/components/star-button";
import { ForkButton } from "@/components/fork-button";
import { SaveButton } from "@/components/save-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const [snippet] = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author.id)));

  return {
    title: `@${author?.username} (${author?.first_name} ${author?.last_name}) / ${snippet.title}`,
    description: author?.bio,
  };
}

export default async function SnippetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;

  const authenticatedUser = await currentUser();

  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const [snippet] = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author.id)));

  if (!snippet) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-semibold">Snippet not found</h1>
      </div>
    );
  }

  const starredSnippets = await db
    .select()
    .from(likes)
    .where(
      and(
        eq(likes.snippetId, snippet.id),
        eq(likes.userId, authenticatedUser?.id || "")
      )
    );

  if (snippet.visibility === "private" && authenticatedUser?.id !== author.id) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">Snippet not found</h1>
      </div>
    );
  }

  const forkedFrom = snippet.forkedFrom
    ? await db
        .select()
        .from(snippets)
        .leftJoin(users, eq(users.id, snippets.userId))
        .where(eq(snippets.id, snippet.forkedFrom))
        .then((result) => result)
    : null;

  const collectionsList = await db
    .select({
      collections,
      hasSnippet: sql<boolean>`
      EXISTS (
        SELECT 1
        FROM ${collectionSnippets}
        WHERE ${collectionSnippets.collectionId} = ${collections.id}
          AND ${collectionSnippets.snippetId} = ${snippet.id}
      )
    `,
    })
    .from(collections)
    .where(eq(collections.userId, authenticatedUser?.id || ""));

  return (
    <main className="grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-8 relative min-h-screen">
      <section className="pl-8 bg-popover border-r">
        <div className="flex flex-col gap-4 sticky top-0 py-8">
          <h2 className="text-2xl font-semibold">About</h2>
          <span className="text-muted-foreground">Author</span>
          <div className="flex gap-3 items-center">
            <Button
              variant="ghost"
              asChild
              className="pr-4 pl-2 py-2 h-full -translate-x-2"
            >
              <Link
                href={`/${author.username}`}
                className="flex gap-3 items-center"
              >
                {author.image_url && (
                  <Image
                    src={author.image_url}
                    width={1000}
                    height={1000}
                    alt="Profile"
                    className="w-12 h-12 object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span>
                    {author.first_name} {author.last_name}
                  </span>
                  <span>@{author.username}</span>
                </div>
              </Link>
            </Button>
          </div>
          {snippet.tags && snippet.tags.length > 0 && (
            <>
              <span className="text-muted-foreground">Tags</span>
              <div className="flex gap-2">
                {snippet.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border border-neutral-700"
                    asChild
                  >
                    <Link href={`/explore?tags=${tag}`}>{tag}</Link>
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4 py-8">
        <SnippetNav username={username} snippet={slug} />
        <header className="flex flex-col gap-2 px-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-semibold">{snippet.title}</h1>
              <Badge variant="secondary" className="border border-neutral-700">
                {snippet.visibility.slice(0, 1).toUpperCase() +
                  snippet.visibility.slice(1)}
              </Badge>
            </div>
            <div className="flex gap-2">
              {author.id === authenticatedUser?.id && (
                <PinSnippetButton
                  id={snippet.id}
                  initialPinned={snippet.pinned}
                />
              )}

              {author.id !== authenticatedUser?.id && (
                <ForkButton id={snippet.id} />
              )}

              <SaveButton
                snippetId={snippet.id}
                userId={authenticatedUser?.id}
                collections={collectionsList}
              />

              {snippet.visibility === "public" && (
                <>
                  <ShareButton
                    isSnippet
                    username={username}
                    slug={snippet.slug}
                    filename={snippet.filename}
                  />
                  <StarButton
                    id={snippet.id}
                    initialStarred={starredSnippets.length > 0}
                    initiallikes={snippet.likesCount}
                  />
                </>
              )}

              {author.id === authenticatedUser?.id && (
                <Button asChild>
                  <Link href={`/${username}/snippets/${snippet.slug}/edit`}>
                    <Edit /> Edit
                  </Link>
                </Button>
              )}
            </div>
          </div>
          {snippet.forkedFrom && forkedFrom && (
            <div className="flex gap-1 items-center text-sm text-muted-foreground">
              <GitFork size={16} />
              Forked from
              <Link
                href={`/${forkedFrom[0].users?.username}/snippets/${forkedFrom[0].snippets.slug}`}
                className="hover:underline"
              >
                {forkedFrom[0].snippets.title}
              </Link>
            </div>
          )}
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            {LANGUAGE_ICON[snippet.language]}
            {snippet.language.slice(0, 1).toUpperCase() +
              snippet.language.slice(1)}
          </div>
        </header>
        {children}
      </section>
      <section className="px-8 bg-popover border-l">
        <div className="flex flex-col gap-4 sticky top-0 py-8">
          {snippet.examples && snippet.examples.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold">Examples</h2>
              <div className="flex flex-wrap gap-2 w-fit">
                {snippet.examples.map((example, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="border border-neutral-700"
                    asChild
                  >
                    <a
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {EXAMPLE_SITE_ICONS[example.website]}
                      {(example.website as string) !== "other"
                        ? example.website.slice(0, 1).toUpperCase() +
                          example.website.slice(1)
                        : "Example"}
                    </a>
                  </Badge>
                ))}
              </div>
            </>
          )}
          <h2 className="text-2xl font-semibold">Summary</h2>
          <p>{snippet.summary ? snippet.summary : "No summary provided."}</p>
        </div>
      </section>
    </main>
  );
}
