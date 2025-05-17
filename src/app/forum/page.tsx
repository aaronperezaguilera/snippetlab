import { currentUser } from "@clerk/nextjs/server";
import { SnippetsWidget } from "@/components/snippets-widget";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ForumFeed } from "@/components/forum-feed";
import { questions, users } from "@/db/schema";
import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";
import { QuestionCard } from "@/components/question-card";

export default async function ForumPage() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">You need to be logged in</h1>
        <p className="mt-4">
          Please log in to view your snippets and explore the community.
        </p>
      </div>
    );
  }

  const yourQuestions = await db
    .select()
    .from(questions)
    .leftJoin(users, eq(questions.userId, users.id))
    .where(eq(questions.userId, user.id))
    .orderBy(desc(questions.createdAt))
    .limit(4);

  return (
    <main className="mt-16 grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-16 relative min-h-screen">
      <SnippetsWidget />
      <section className="flex flex-col gap-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-balance">Q&A Forum</h1>
          <Button>
            <Link href="/forum/new" className="flex items-center gap-2">
              <Plus /> Create a question
            </Link>
          </Button>
        </header>
        <ForumFeed />
      </section>
      <section className="flex flex-col pr-16">
        <h2 className="text-xl font-bold mb-4">Your questions</h2>
        {yourQuestions.length > 0 ? (
          <>
            {yourQuestions.map(
              ({ questions, users }) =>
                users && (
                  <QuestionCard
                    key={questions.id}
                    question={questions}
                    author={users}
                    showAuthor={false}
                  />
                )
            )}
            <Link
              href={`/${user.username}/questions`}
              className=" hover:underline text-muted-foreground text-sm w-fit mt-4"
            >
              Show all your questions
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-semibold">No questions found</h3>
            <p className="text-gray-500">
              You haven&apos;t asked any questions yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
