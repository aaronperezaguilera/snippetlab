// app/explorar/page.tsx
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { eq, desc, and, ne, sql, asc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { ExploreFilters } from "@/components/explore-filters";
import { SocialSnippetCard } from "@/components/social-snippet-card";

type SearchParams = {
  search?: string;
  page?: string;
  language?: string;
  tags?: string;
  sort?: "popular" | "newest" | "oldest";
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
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
  const params_search = (await searchParams) || {};
  const search = (params_search.search || "").trim().toLowerCase();
  const language = params_search.language || "";
  const sort = params_search.sort || "newest";

  const whereClauses = [
    ...(search ? [sql`LOWER(${snippets.title}) LIKE ${`%${search}%`}`] : []),
    ...(language && language !== "all"
      ? [eq(snippets.language, language)]
      : []),
  ];

  let orderByClause;
  switch (sort) {
    case "newest":
      orderByClause = desc(snippets.createdAt);
      break;
    case "oldest":
      orderByClause = asc(snippets.createdAt);
      break;
    case "popular":
      orderByClause = desc(snippets.starsCount);
      break;
    default:
      orderByClause = desc(snippets.createdAt);
  }

  const recientes = await db
    .select({ snippets, users })
    .from(snippets)
    .leftJoin(users, eq(snippets.userId, users.id))
    .where(
      and(
        eq(snippets.visibility, "public"),
        ne(snippets.userId, authenticatedUser.id),
        ...whereClauses
      )
    )
    .orderBy(orderByClause)
    .limit(10);

  return (
    <main className="px-16 mx-auto grid grid-cols-[300px_1fr] gap-16 mt-16">
      <section>
        <h1 className="text-2xl font-semibold mb-4">Explore</h1>
        <div className="flex flex-col gap-2">
          <ExploreFilters />
        </div>
      </section>
      <section>
        <div className="grid sm:grid-cols-2 gap-6">
          {recientes.map(
            (snip) =>
              snip.users && (
                <SocialSnippetCard
                  key={snip.snippets.id}
                  user={snip.users}
                  {...snip.snippets}
                />
              )
          )}
        </div>
      </section>
    </main>
  );
}
