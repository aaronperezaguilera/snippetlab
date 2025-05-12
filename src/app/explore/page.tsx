// app/explorar/page.tsx
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { eq, desc, and, ne } from "drizzle-orm";
import { SnippetCard } from "@/components/snippet-card";
import { currentUser } from "@clerk/nextjs/server";

export default async function ExplorePage() {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">
          You need to be logged in to explore snippets
        </h1>
      </div>
    );
  }

  const recientes = await db
    .select({ snippets, username: users.username })
    .from(snippets)
    .leftJoin(users, eq(snippets.userId, users.id))
    .where(
      and(
        eq(snippets.visibility, "public"),
        ne(snippets.userId, authenticatedUser.id)
      )
    )
    .orderBy(desc(snippets.createdAt))
    .limit(10);

  const populares = await db
    .select({ snippets, username: users.username })
    .from(snippets)
    .leftJoin(users, eq(snippets.userId, users.id))
    .where(
      and(
        eq(snippets.visibility, "public"),
        ne(snippets.userId, authenticatedUser.id)
      )
    )
    .orderBy(desc(snippets.starsCount))
    .limit(10);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Más recientes</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {recientes.map((snip) => (
            <SnippetCard
              key={snip.snippets.id}
              username={snip.username || ""}
              {...snip.snippets}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Más populares</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {populares.map((snip) => (
            <SnippetCard
              key={snip.snippets.id}
              username={snip.username || ""}
              {...snip.snippets}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
