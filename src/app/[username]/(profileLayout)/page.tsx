import { CollectionCard } from "@/components/collection-card";
import { SnippetCard } from "@/components/snippet-card";
import { db } from "@/db/drizzle";
import { collections, snippets, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (!author) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </div>
    );
  }

  const snippetsList = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.pinned, true), eq(snippets.userId, author.id)))
    .limit(4);

  const collectionsList = await db
    .select()
    .from(collections)
    .where(and(eq(collections.pinned, true), eq(collections.userId, author.id)))
    .limit(4);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Pinned snippets</h2>
        {snippetsList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {snippetsList.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                showCode={false}
                author={author}
                snippet={snippet}
              />
            ))}
          </div>
        ) : (
          <p>No snippets found</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Pinned collections</h2>
        {collectionsList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {collectionsList.map((collection) => (
              <CollectionCard
                key={collection.id}
                author={author}
                collection={collection}
              />
            ))}
          </div>
        ) : (
          <p>No snippets found</p>
        )}
      </div>
    </div>
  );
}
