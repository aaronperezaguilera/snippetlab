import { QuestionForm } from "@/components/question-form";
import { db } from "@/db/drizzle";
import { snippets } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";

export default async function NewQuestionPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">
          You must be logged in to create a question
        </h1>
      </div>
    );
  }

  const snippetOptions = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.userId, user.id), eq(snippets.visibility, "public")))
    .orderBy(desc(snippets.createdAt));

  return (
    <main className="container mx-auto mt-16 min-h-screen">
      <h1 className="text-2xl font-semibold">New Question</h1>
      <QuestionForm snippets={snippetOptions} />
    </main>
  );
}
