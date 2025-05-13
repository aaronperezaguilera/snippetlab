import { db } from "@/db/drizzle";
import { snippets, follows, users } from "@/db/schema";
import { eq, inArray, desc, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { SnippetCard } from "./snippet-card";

export async function Feed() {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Please log in to see the feed</h1>
      </div>
    );
  }

  const followRows = await db
    .select({ followingId: follows.followingId })
    .from(follows)
    .where(eq(follows.followerId, authenticatedUser.id));

  const followedIds: string[] = followRows.map((r) => r.followingId);

  // Si no hay seguidos, devuelve array vacío
  if (followedIds.length === 0) {
    return [];
  }

  // 2. Selecciona los snippets públicos de esos usuarios
  const feedSnippets = await db
    .select()
    .from(snippets)
    .leftJoin(users, eq(snippets.userId, users.id))
    .where(
      and(
        eq(snippets.visibility, "public"),
        inArray(snippets.userId, followedIds)
      )
    )
    .orderBy(desc(snippets.createdAt));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Feed</h1>
      </div>
      <div className="flex flex-col gap-4">
        {feedSnippets.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">No snippets found</p>
          </div>
        ) : (
          feedSnippets.map(
            (snippet) =>
              snippet.users && (
                <SnippetCard
                  key={snippet.snippets.id}
                  author={snippet.users}
                  showAuthor
                  {...snippet.snippets}
                />
              )
          )
        )}
      </div>
    </div>
  );
}
