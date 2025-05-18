import { Author } from "@/components/author";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { sql } from "drizzle-orm";

export default async function UserssSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const params_search = await searchParams;
  const search = (params_search.search || "").trim().toLowerCase();

  const snippetList = await db
    .select()
    .from(users)
    .where(
      sql`LOWER(${users.username}) LIKE ${`%${search}%`} OR LOWER(${
        users.first_name
      }) LIKE ${`%${search}%`} OR LOWER(${
        users.last_name
      }) LIKE ${`%${search}%`}`
    );

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Search {params_search.search} in users
      </h1>
      {snippetList.length > 0 ? (
        <div className="flex flex-col gap-2">
          {snippetList.map((user) => (
            <Author
              author={user}
              key={user.id}
              clasName="w-full justify-start"
              showBio
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </section>
  );
}
