import { SnippetCard } from "@/components/snippet-card";
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export default async function ProfilePage({
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

  const snippetsList = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.pinned, true), eq(snippets.userId, user.id)));

  return (
    <div>
      <h1 className="text-2xl font-bold">Pinned</h1>
      {snippetsList.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {snippetsList.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              showCode={false}
              author={user}
              snippet={snippet}
            />
          ))}
        </div>
      ) : (
        <p>No snippets found</p>
      )}
    </div>
  );
}
