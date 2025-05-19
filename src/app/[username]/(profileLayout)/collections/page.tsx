import { CollectionCard } from "@/components/collection-card";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { collections, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and, sql } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function LikesPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams?: Promise<{ search?: string }>;
}) {
  const { username } = await params;
  const params_search = (await searchParams) || {};
  const search = (params_search.search || "").trim().toLowerCase();

  const authenticatedUser = await currentUser();

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </div>
    );
  }

  const whereClauses = [
    eq(collections.userId, user.id),
    ...(search ? [sql`LOWER(${collections.title}) LIKE ${`%${search}%`}`] : []),
  ];

  const getRows = unstable_cache(async () => {
    return await db
      .select()
      .from(collections)
      .where(and(...whereClauses));
  }, [`${username}-collections-${search || ""}`]);

  const rows = await getRows();

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-semibold">Collections</h1>
      <div className="flex gap-2">
        <Search placeholder="Search collections..." />
        {authenticatedUser?.id === user.id && (
          <Button asChild>
            <Link href={`/${username}/collections/new`}>
              <PlusIcon /> Create
            </Link>
          </Button>
        )}
      </div>
      {rows.length > 0 ? (
        <div className="flex flex-col">
          {rows.map((row) => (
            <CollectionCard key={row.id} collection={row} author={user} />
          ))}
        </div>
      ) : (
        <p>No collections found. Start by creating one.</p>
      )}
    </div>
  );
}
