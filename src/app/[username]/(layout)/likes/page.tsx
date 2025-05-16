import { SnippetCard } from "@/components/snippet-card";
import { db } from "@/db/drizzle";
import { likes, snippets, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function LikesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  const getRows = unstable_cache(async () => {
    return await db
      .select()
      .from(likes)
      .leftJoin(snippets, eq(likes.snippetId, snippets.id))
      .leftJoin(users, eq(snippets.userId, users.id))
      .where(eq(likes.userId, user.id))
      .groupBy(likes.id, snippets.id, users.id);
  }, [`${username}-likes`]);

  const rows = await getRows();

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Liked snippets</h1>

      {rows.length > 0 ? (
        <div className="flex flex-col gap-4">
          {rows.map(
            (row) =>
              row.snippets &&
              row.users && (
                <SnippetCard
                  key={row.snippets.id}
                  author={row.users}
                  {...row.snippets}
                  snippet={row.snippets}
                  showAuthor
                />
              )
          )}
        </div>
      ) : (
        <p>
          No liked snippets found.{" "}
          <Link href="/explore" className="underline">
            Start exploring
          </Link>
        </p>
      )}
    </div>
  );
}
