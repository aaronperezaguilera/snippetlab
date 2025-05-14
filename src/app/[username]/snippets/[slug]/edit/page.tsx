import { Examples, SnippetForm } from "@/components/snippet-form";
import { db } from "@/db/drizzle";
import { snippets } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function EditSnippet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const authenticatedUser = await currentUser();

  const snippet = await db
    .select()
    .from(snippets)
    .where(eq(snippets.slug, slug));

  const currentSnippet = snippet[0];

  if (
    snippet.length === 0 ||
    authenticatedUser?.id !== currentSnippet.userId ||
    !currentSnippet
  ) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Edit your snippet</h1>
      <SnippetForm
        id={currentSnippet.id}
        title={currentSnippet.title}
        defaultLanguage={currentSnippet.language}
        code={currentSnippet.code}
        defaultTags={currentSnippet.tags as string[]}
        visibility={currentSnippet.visibility}
        summary={currentSnippet.summary as string}
        defaultExamples={
          currentSnippet.examples.map((example) => ({
            website: example.website as keyof [
              "codilink",
              "codepen",
              "codesandbox",
              "other"
            ],
            url: example.url,
          })) as Examples
        }
        type="edit"
      />
    </main>
  );
}
