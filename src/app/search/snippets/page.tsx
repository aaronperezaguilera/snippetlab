import { SnippetCard } from "@/components/snippet-card";
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function SnippetsSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const params_search = await searchParams;
  const search = (params_search.search || "").trim().toLowerCase();

  const snippetList = await db
    .select()
    .from(snippets)
    .innerJoin(users, eq(users.id, snippets.userId))
    .where(sql`LOWER(${snippets.title}) LIKE ${`%${search.toLowerCase()}%`}`);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        Search {params_search.search} in snippets
      </h1>
      {snippetList.length > 0 ? (
        <div className="flex flex-col">
          {snippetList.map(({ snippets, users }) => (
            <SnippetCard
              author={users}
              snippet={snippets}
              key={snippets.id}
              showAuthor
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">No snippets found</p>
        </div>
      )}
    </section>
  );
}
