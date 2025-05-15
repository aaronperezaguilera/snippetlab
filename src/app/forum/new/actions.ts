"use server";

import { db } from "@/db/drizzle";
import { questions } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createQuestion(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const snippetId = parseInt(formData.get("snippet") as string);

  const [{ id }] = await db
    .insert(questions)
    .values([
      {
        title,
        content,
        snippetId,
        userId: user.id,
      },
    ])
    .returning();

  revalidatePath(`/forum/${id}`);
  redirect(`/forum/${id}`);
}
