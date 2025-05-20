import { db } from "@/db/drizzle";
import { users, collections, snippets, collectionSnippets } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ShareButton } from "@/components/share";
import { SnippetCard } from "@/components/snippet-card";
import { Toast } from "@/components/toast";
import { PinCollectionButton } from "@/components/pin-collection-button";

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

  const [collection] = await db
    .select()
    .from(collections)
    .where(and(eq(collections.slug, slug), eq(collections.userId, author.id)));

  return {
    title: `@${author?.username} (${author?.first_name} ${author?.last_name}) / ${collection.title}`,
    description: author?.bio,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; slug: string }>;
  searchParams?: Promise<{ created?: boolean; updated?: boolean }>;
}) {
  const { username, slug } = await params;
  const { created, updated } = (await searchParams) || {};

  const authenticatedUser = await currentUser();

  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const [collection] = await db
    .select()
    .from(collections)
    .where(and(eq(collections.slug, slug), eq(collections.userId, author.id)));

  if (!collection) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-semibold">Collection not found</h1>
      </div>
    );
  }

  if (
    collection.visibility === "private" &&
    authenticatedUser?.id !== author.id
  ) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">Collection not found</h1>
      </div>
    );
  }

  const collectionSnippetsList = await db
    .select()
    .from(snippets)
    .innerJoin(
      collectionSnippets,
      and(
        eq(collectionSnippets.collectionId, collection.id),
        eq(collectionSnippets.snippetId, snippets.id)
      )
    )
    .leftJoin(users, eq(users.id, snippets.userId));

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-semibold">{collection.title}</h1>
            <Badge variant="secondary" className="border border-neutral-700">
              {collection.visibility.slice(0, 1).toUpperCase() +
                collection.visibility.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            {author.id === authenticatedUser?.id && (
              <PinCollectionButton
                id={collection.id}
                initialPinned={collection.pinned}
              />
            )}
            {collection.visibility === "public" && (
              <>
                <ShareButton />
              </>
            )}

            {author.id === authenticatedUser?.id && (
              <Button asChild>
                <Link href={`/${username}/collections/${collection.slug}/edit`}>
                  <Edit /> Edit
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="grid sm:grid-cols-2 gap-6">
        {collectionSnippetsList.map(
          (snip) =>
            snip.users && (
              <SnippetCard
                key={snip.snippets.id}
                author={snip.users}
                snippet={snip.snippets}
                showAuthor
              />
            )
        )}
      </div>
      {created && <Toast message="Collection created successfully!" />}
      {updated && <Toast message="Collection updated successfully!" />}
    </section>
  );
}
