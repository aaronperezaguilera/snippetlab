// app/explorar/page.tsx
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { eq, desc, and, ne, sql, asc, arrayContains, or } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { ExploreFilters } from "@/components/explore-filters";
import { SnippetCard } from "@/components/snippet-card";
import { Metadata } from "next";

type SearchParams = {
  search?: string;
  page?: string;
  language?: string;
  tags?: string;
  sort?: "popular" | "newest" | "oldest";
};

export const metadata: Metadata = {
  title: "Explore snippets - SnippetLab",
  description: "Explore snippets from the community",
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
        <h1 className="text-2xl font-semibold">
          You need to be logged in to explore snippets
        </h1>
      </div>
    );
  }
  const params_search = (await searchParams) || {};
  const search = (params_search.search || "").trim().toLowerCase();
  const language = params_search.language || "";
  const sort = params_search.sort || "newest";
  const tags = params_search.tags || "";

  let tagsArray: string[] = [];

  if (tags) {
    tagsArray = tags.split(",").map((tag) => tag.trim());
  }

  const tagOrClause =
    tagsArray.length > 0
      ? or(
          ...tagsArray.map((tag) =>
            // this generates: snippets.tags @> ARRAY['tag']
            arrayContains(snippets.tags, [tag])
          )
        )
      : undefined;

  const whereClauses = [
    ...(search ? [sql`LOWER(${snippets.title}) LIKE ${`%${search}%`}`] : []),
    ...(language && language !== "all"
      ? [eq(snippets.language, language)]
      : []),
    ...(tagOrClause ? [tagOrClause] : []),
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
      orderByClause = desc(snippets.likesCount);
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
    <main className=" mx-auto grid grid-cols-[300px_1fr] gap-16 p-8 min-h-screen">
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
                <SnippetCard
                  key={snip.snippets.id}
                  author={snip.users}
                  snippet={snip.snippets}
                  showAuthor
                />
              )
          )}
        </div>
      </section>
    </main>
  );
}
