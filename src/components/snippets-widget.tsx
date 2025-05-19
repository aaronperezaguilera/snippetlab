import Link from "next/link";
import { Button } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Author } from "./author";

export async function SnippetsWidget() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  const [author] = await db.select().from(users).where(eq(users.id, user.id));

  const snippetsList = await db
    .select()
    .from(snippets)
    .where(eq(snippets.userId, user.id))
    .orderBy(desc(snippets.createdAt))
    .limit(5);

  return (
    <div className="px-8 pt-8 sticky top-0">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <Author author={author} />
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Snippets</h2>
          <Button asChild>
            <Link href={`/${user.username}/snippets/new`}>
              <PlusIcon /> Create
            </Link>
          </Button>
        </div>
        {snippetsList.length > 0 ? (
          <div className="flex flex-col gap-2">
            {snippetsList.map((snippet) => (
              <div key={snippet.id}>
                <Link
                  href={`/${user.username}/snippets/${snippet.slug}`}
                  className=" hover:underline"
                >
                  {snippet.title}
                </Link>
              </div>
            ))}
            <Link
              href={`/${user.username}/snippets`}
              className=" hover:underline text-muted-foreground text-sm w-fit mt-2"
            >
              Show all
            </Link>
          </div>
        ) : (
          <p className="text-muted-foreground">
            You have no snippets yet. Create one!
          </p>
        )}
      </div>
    </div>
  );
}
