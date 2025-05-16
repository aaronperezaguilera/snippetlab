"use server";

import { db } from "@/db/drizzle";
import { answers } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createAnswer(
  questionId: number,
  code: string | undefined,
  language: string | undefined,
  formData: FormData
) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const content = formData.get("content") as string;

  await db.insert(answers).values([
    {
      questionId,
      userId: user.id,
      content,
      code: code !== undefined ? code : null,
      language: language !== undefined ? language : null,
    },
  ]);

  revalidatePath(`/forum/${questionId}`);
}
