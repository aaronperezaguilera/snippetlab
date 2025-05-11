import { ProfileNav } from "@/components/profile-nav";
import { Search } from "@/components/search";
import { SnippetCard } from "@/components/snippet-card";
import { SnippetsFilter } from "@/components/snippets-filter";
import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { pins, snippets, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, asc, desc, sql } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams?: {
    search?: string;
    page?: string;
    language?: string;
    type?: "all" | "public" | "private";
    sort?: string; // "popular" | "newest" | "oldest"
  };
}) {
  const { username } = await params;
  const search = (searchParams?.search || "").trim().toLowerCase();
  const language = searchParams?.language || "";
  const type = searchParams?.type || "";
  const sort = searchParams?.sort || "newest";

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

  const whereClauses = [
    eq(snippets.userId, user.id),
    // si hay search, hacemos ILIKE sobre el título en minúsculas
    ...(search ? [sql`LOWER(${snippets.title}) LIKE ${`%${search}%`}`] : []),
    ...(language && language !== "all"
      ? [eq(snippets.language, language)]
      : []),
    ...(type && type !== "all"
      ? [eq(snippets.visibility, type as "public" | "private")]
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
      // contaremos cuántos pins tiene cada snippet
      orderByClause = desc(sql`COUNT(${pins.id})`);
      break;
    default:
      orderByClause = desc(snippets.createdAt);
  }

  const getRows = unstable_cache(
    async () => {
      return await db
        .select({
          snippet: snippets,
          pinCount: sql`COUNT(${pins.id})`.as("pinCount"),
        })
        .from(snippets)
        .leftJoin(pins, eq(pins.snippetId, snippets.id))
        .where(and(...whereClauses))
        .groupBy(snippets.id)
        .orderBy(orderByClause);
    },
    [`${username}-${search}-${language}-${type}-${sort}`] // 3) la key para invalidar correctamente
  );

  const rows = await getRows();

  const pinnedRows = authenticatedUser?.id
    ? await db
        .select({ snippetId: pins.snippetId })
        .from(pins)
        .where(eq(pins.userId, authenticatedUser.id))
    : [];

  const pinnedIds = pinnedRows.map((p) => p.snippetId);

  return (
    <main className="container mx-auto grid grid-cols-[1fr_3fr] gap-16 mt-16">
      {/* … panel izquierdo con avatar y botón “Edit” … */}
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-square bg-neutral-600">
          {user.image_url && (
            <Image
              src={user.image_url}
              width={1000}
              height={1000}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <Button className="w-full" variant="secondary">
          Edit profile
        </Button>
      </div>

      {/* … lista de snippets … */}
      <div className="flex flex-col gap-4">
        <ProfileNav username={user.username} active="snippets" />
        <h1 className="text-2xl font-bold">Snippets</h1>

        <div className="flex gap-2">
          <Search placeholder="Search snippets..." />
          <SnippetsFilter />
          {authenticatedUser?.id === user.id && (
            <Button asChild>
              <Link href={`/${username}/snippets/new`}>
                <PlusIcon /> Create
              </Link>
            </Button>
          )}
        </div>

        {rows.length > 0 ? (
          <div className="flex flex-col gap-4">
            {rows.map(({ snippet }) =>
              snippet.userId === authenticatedUser?.id ||
              snippet.visibility === "public" ? (
                <SnippetCard
                  key={snippet.id}
                  username={username}
                  {...snippet}
                  // marcamos “pin” solo si está pineado por este usuario
                  isPinned={pinnedIds.includes(snippet.id)}
                />
              ) : null
            )}
          </div>
        ) : (
          <p>No snippets found</p>
        )}
      </div>
    </main>
  );
}
