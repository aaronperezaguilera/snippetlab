import { CodeReader } from "@/components/code-reader";
import { LANGUAGE_ICON } from "@/config";
import { db } from "@/db/drizzle";
import { snippets, likes, users, collections } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, GitFork } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ShareButton } from "@/components/share";
import { PinButton } from "@/components/pin-button";
import { StarButton } from "@/components/star-button";
import { SnippetNav } from "@/components/snippet-nav";
import { ForkButton } from "@/components/fork-button";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;

  const authenticatedUser = await currentUser();

  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const [collection] = await db
    .select()
    .from(collections)
    .where(and(eq(collections.slug, slug), eq(collections.userId, author.id)));

  if (!collection) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Collection not found</h1>
      </div>
    );
  }

  if (
    collection.visibility === "private" &&
    authenticatedUser?.id !== author.id
  ) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Collection not found</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto gap-16 mt-16">
      <section className="flex flex-col gap-4 px-16">
        <header className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-bold">{collection.title}</h1>
              <Badge variant="secondary" className="border border-neutral-700">
                {collection.visibility.slice(0, 1).toUpperCase() +
                  collection.visibility.slice(1)}
              </Badge>
            </div>
            <div className="flex gap-2">
              {author.id === authenticatedUser?.id && (
                <PinButton
                  id={collection.id}
                  initialPinned={collection.pinned}
                />
              )}
              {author.id !== authenticatedUser?.id &&
                collection.visibility === "public" && (
                  <ForkButton id={collection.id} />
                )}
              {collection.visibility === "public" && (
                <>
                  <ShareButton />
                  <StarButton
                    id={collection.id}
                    initialStarred={false}
                    initiallikes={collection.bookmarksCount}
                  />
                </>
              )}

              {author.id === authenticatedUser?.id && (
                <Button asChild>
                  <Link href={`/${username}/snippets/${collection.slug}/edit`}>
                    <Edit /> Edit
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </header>
      </section>
    </main>
  );
}
