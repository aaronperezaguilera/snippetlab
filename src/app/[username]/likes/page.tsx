import { Profile } from "@/components/profile";
import { ProfileNav } from "@/components/profile-nav";
import { SnippetCard } from "@/components/snippet-card";
import { db } from "@/db/drizzle";
import { likes, snippets, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function LikesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const authenticatedUser = await currentUser();

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
    <main className="container mx-auto grid grid-cols-[1fr_3fr] gap-16 mt-16">
      <Profile username={username} />

      <div className="flex flex-col gap-4 overflow-hidden">
        <ProfileNav username={user.username} active="likes" />
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
    </main>
  );
}
