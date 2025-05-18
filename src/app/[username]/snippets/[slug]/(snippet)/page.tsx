import { CodeReader } from "@/components/code-reader";
import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { Toast } from "@/components/toast";

export default async function SnippetPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; slug: string }>;
  searchParams?: Promise<{ created?: boolean; updated?: boolean }>;
}) {
  const { username, slug } = await params;
  const { created, updated } = (await searchParams) || {};

  const authenticatedUser = await currentUser();

  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const [snippet] = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author.id)));

  if (!snippet) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  if (snippet.visibility === "private" && authenticatedUser?.id !== author.id) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-16">
      <CodeReader
        filename={snippet.filename}
        language={snippet.language}
        code={snippet.code}
      />
      {created && <Toast message={"Snippet created successfully!"} />}
      {updated && <Toast message={"Snippet updated successfully!"} />}
    </div>
  );
}
