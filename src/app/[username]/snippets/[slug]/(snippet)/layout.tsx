import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function SnippetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;

  const authenticatedUser = await currentUser();

  const author = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const snippet = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author[0].id)));

  const currentSnippet = snippet[0];

  if (snippet.length === 0) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  if (
    currentSnippet.visibility === "private" &&
    authenticatedUser?.id !== author[0].id
  ) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  return (
    <main className="mt-16 grid grid-cols-[1fr_3fr_1fr] gap-16 relative">
      <section className="flex flex-col gap-4 pl-16 sticky top-16 h-fit">
        <h2 className="text-2xl font-semibold">About</h2>
        <span className="text-muted-foreground">Author</span>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            asChild
            className="pr-4 pl-2 py-2 h-full -translate-x-2"
          >
            <Link
              href={`/${author[0].username}`}
              className="flex gap-3 items-center"
            >
              {author[0]?.image_url && (
                <Image
                  src={author[0]?.image_url}
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-col">
                <span>
                  {author[0].first_name} {author[0].last_name}
                </span>
                <span>@{author[0].username}</span>
              </div>
            </Link>
          </Button>
        </div>
        {currentSnippet.tags && currentSnippet.tags.length > 0 && (
          <>
            <span className="text-muted-foreground">Tags</span>
            <div className="flex gap-2">
              {currentSnippet.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border border-neutral-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </section>
      {children}
      <section className="flex flex-col gap-4 pr-16 sticky top-16 h-fit">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p>
          {currentSnippet.summary
            ? currentSnippet.summary
            : "No summary provided."}
        </p>
      </section>
    </main>
  );
}
