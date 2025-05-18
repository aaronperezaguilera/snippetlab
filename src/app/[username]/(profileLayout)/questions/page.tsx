import { db } from "@/db/drizzle";
import { questions, snippets, users } from "@/db/schema";
import { desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { QuestionCard } from "@/components/question-card";

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const authenticatedUser = await currentUser();
  if (!authenticatedUser) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Please log in to see the feed</h1>
      </div>
    );
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const questionsList = await db
    .select()
    .from(questions)
    .leftJoin(snippets, eq(questions.snippetId, snippets.id))
    .leftJoin(users, eq(users.id, questions.userId))
    .where(eq(questions.userId, user.id))
    .orderBy(desc(questions.createdAt));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
      </div>
      <div className="flex flex-col">
        {questionsList.length > 0 ? (
          questionsList.map(
            ({ questions, snippets, users }) =>
              users && (
                <QuestionCard
                  key={questions.id}
                  author={users}
                  question={questions}
                  snippet={snippets || undefined}
                  showAuthor
                />
              )
          )
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">No questions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
