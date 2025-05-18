"use server";

import { db } from "@/db/drizzle";
import { snippets, likes, collectionSnippets, collections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { and, count, eq, inArray, not } from "drizzle-orm";
import { upsertUser } from "@/db";
import { formatSlug } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function updatePin(id: number, pin: boolean) {
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  const snippet = await db.select().from(snippets).where(eq(snippets.id, id));

  if (snippet.length === 0) {
    throw new Error("Snippet not found");
  }

  const currentSnippet = snippet[0];

  if (userId !== currentSnippet.userId) {
    throw new Error("You are not the owner of this snippet");
  }

  await db
    .update(snippets)
    .set({
      pinned: pin,
    })
    .where(eq(snippets.id, id));

  revalidatePath(`/${username}/snippets`);
}

export async function updateStar(id: number, star: boolean) {
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  const snippet = await db.select().from(snippets).where(eq(snippets.id, id));

  if (snippet.length === 0) {
    throw new Error("Snippet not found");
  }

  if (star) {
    await db.insert(likes).values({
      snippetId: id,
      userId: userId,
    });
  } else {
    await db
      .delete(likes)
      .where(and(eq(likes.snippetId, id), eq(likes.userId, userId)));
  }

  revalidatePath(`/${username}/snippets`);
  revalidatePath(`/${username}/likes`);
}

export async function forkSnippet(snippetId: number) {
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  const [{ id, title, filename, language, code, tags, summary, examples }] =
    await db.select().from(snippets).where(eq(snippets.id, snippetId));

  if (!id) {
    throw new Error("Snippet not found");
  }

  const baseSlug = formatSlug(title);

  let slug = baseSlug;
  let attempt = 0;

  while (true) {
    const [{ count: existingCount }] = await db
      .select({ count: count() })
      .from(snippets)
      .where(eq(snippets.slug, slug));

    if (Number(existingCount) === 0) {
      break;
    }

    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  await db.insert(snippets).values({
    title,
    filename,
    slug,
    language,
    code,
    tags,
    summary,
    examples,
    visibility: "public",
    forkedFrom: id,
    userId: userId,
  });

  revalidatePath(`/${username}/snippets`);
  redirect(`/${username}/snippets/${slug}`);
}

export async function updateSnippetCollection(
  snippetId: number,
  formData: FormData
) {
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const username = user.username;

  const ids = formData.getAll("collectionIds").map((i) => Number(i));

  await db
    .delete(collectionSnippets)
    .where(
      and(
        eq(collectionSnippets.snippetId, snippetId),
        not(inArray(collectionSnippets.collectionId, ids))
      )
    );

  for (const colId of ids) {
    await db
      .insert(collectionSnippets)
      .values({
        snippetId,
        collectionId: colId,
      })
      .onConflictDoNothing();
  }

  revalidatePath(`/${username}/collections`);
}
