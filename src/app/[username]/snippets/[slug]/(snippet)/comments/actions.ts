"use server";

import { db } from "@/db/drizzle";
import { comments, snippets } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function addComment(id: number, content: string) {
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const username = user.username;

  const snippet = await db.select().from(snippets).where(eq(snippets.id, id));

  if (snippet.length === 0) {
    throw new Error("Snippet not found");
  }
  const currentSnippet = snippet[0];

  await db.insert(comments).values({
    content,
    snippetId: currentSnippet.id,
    userId: user.id,
  });

  revalidatePath(`/${username}/snippets/${currentSnippet.slug}`);
  revalidatePath(`/${username}/snippets/${currentSnippet.slug}/comments`);
}
