import { AnswerForm } from "@/components/answer-form";
import { Author } from "@/components/author";
import { CodeReader } from "@/components/code-reader";
import { Md } from "@/components/md";
import { RelativeTime } from "@/components/relative-time";
import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { answers, questions, snippets, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [data] = await db
    .select()
    .from(questions)
    .leftJoin(snippets, eq(questions.snippetId, snippets.id))
    .leftJoin(users, eq(questions.userId, users.id))
    .where(eq(questions.id, parseInt(id)));

  return {
    title: `@${data.users?.username} (${data.users?.first_name} ${data.users?.last_name}) / ${data.questions.title}`,
    description: data.questions.content,
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [data] = await db
    .select()
    .from(questions)
    .leftJoin(snippets, eq(questions.snippetId, snippets.id))
    .leftJoin(users, eq(questions.userId, users.id))
    .where(eq(questions.id, parseInt(id)));

  if (!data.questions) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">Question not found</h1>
      </div>
    );
  }

  const answersList = await db
    .select()
    .from(answers)
    .leftJoin(users, eq(answers.userId, users.id))
    .where(eq(answers.questionId, data.questions.id))
    .orderBy(desc(answers.createdAt));

  return (
    <main className="container mx-auto mt-16 flex flex-col gap-4 min-h-screen">
      <Button variant="ghost" className="w-fit" asChild>
        <Link href="/forum">
          <ChevronLeft /> Return to forum
        </Link>
      </Button>
      {data.users && <Author author={data.users} />}
      <div className="flex flex-col gap-4 pb-4 border-b">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{data.questions.title}</h1>
          <Md>{data.questions.content}</Md>
        </div>
        {data.snippets && (
          <CodeReader
            filename={data.snippets.filename}
            language={data.snippets.language}
            code={data.snippets.code}
          />
        )}
      </div>
      <AnswerForm
        snippet={data.snippets || undefined}
        questionId={data.questions.id}
      />
      <h2 className="text-xl">Answers</h2>
      {answersList.length > 0 ? (
        answersList.map(({ answers, users }) => (
          <div
            key={answers.id}
            className="p-4 border-b flex flex-col relative gap-4 transition-colors"
          >
            {users && <Author author={users} />}
            <Md>{answers.content}</Md>
            {answers.code && answers.language && data.snippets && (
              <div>
                <div className="px-4 bg-[#28292c] py-2 border rounded-t-sm">
                  {data.snippets.filename}
                </div>
                <CodeReader language={answers.language} code={answers.code} />
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              <RelativeTime datetime={answers.createdAt} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-lg font-semibold">No answers found</h3>
          <p className="text-sm text-muted-foreground">
            Be the first to answer this question!
          </p>
        </div>
      )}
    </main>
  );
}
