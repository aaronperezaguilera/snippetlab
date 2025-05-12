import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import { db } from "@/db/drizzle";
import { snippets } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function SnippetsWidget() {
  const user = await currentUser();

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
    .where(eq(snippets.userId, user.id))
    .orderBy(desc(snippets.createdAt))
    .limit(5);

  return (
    <div className="pl-16">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            asChild
            className="pr-4 pl-2 py-2 h-full -translate-x-2"
          >
            <Link
              href={`/${user.username}`}
              className="flex gap-3 items-center"
            >
              {user.imageUrl && (
                <Image
                  src={user.imageUrl}
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-12 h-12 object-cover"
                />
              )}
              <div className="flex flex-col">
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span>@{user.username}</span>
              </div>
            </Link>
          </Button>
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
