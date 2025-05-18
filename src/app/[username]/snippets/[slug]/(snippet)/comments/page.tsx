// app/snippet/[id]/page.tsx (o donde renderees el snippet)
import { comments, snippets } from "@/db/schema";
import { db } from "@/db/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";

export default async function EditSnippet({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { slug } = await params;

  const authenticatedUser = await currentUser();

  const snippet = await db
    .select()
    .from(snippets)
    .where(eq(snippets.slug, slug));

  const currentSnippet = snippet[0];

  if (
    currentSnippet.visibility === "private" &&
    authenticatedUser?.id !== currentSnippet.userId
  ) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  // Traer comentarios existentes
  const snippetComments = await db
    .select()
    .from(comments)
    .where(eq(comments.snippetId, currentSnippet.id))
    .orderBy(desc(comments.createdAt));

  return (
    <div className="flex flex-col gap-4 px-16 mt-4">
      <h1 className="text-2xl font-bold">Comments</h1>
      <CommentForm snippetId={currentSnippet.id} />
      {snippetComments.length === 0 ? (
        <p className="text-muted-foreground mt-4">
          Be the first to comment on this snippet!
        </p>
      ) : (
        snippetComments.map((c) => <CommentCard key={c.id} comment={c} />)
      )}
    </div>
  );
}
