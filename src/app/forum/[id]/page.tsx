import { db } from "@/db/drizzle";
import { questions } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [question] = await db
    .select()
    .from(questions)
    .where(eq(questions.id, parseInt(id)));

  if (!question) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Question not found</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p>{question.content}</p>
    </div>
  );
}
