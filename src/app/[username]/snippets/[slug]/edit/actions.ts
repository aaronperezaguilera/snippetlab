"use server";

import { db } from "@/db/drizzle";
import { snippets } from "@/db/schema";
import { formatSlug } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function updateSnippet(
  value: string | undefined,
  tags: string[],
  id: number,
  formData: FormData
) {
  const rawFormData = {
    title: formData.get("title"),
    language: formData.get("language"),
    visibility: formData.get("visibility"),
    summary: formData.get("summary"),
  };

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  upsertUser(user);

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

  let slug;

  if (currentSnippet.title !== rawFormData.title) {
    const baseSlug = formatSlug(rawFormData.title as string);
    slug = baseSlug;
    // 4. Encontrar un slug único
    let attempt = 0;

    while (true) {
      // Contar cuántos snippets ya tienen este slug
      const [{ count: existingCount }] = await db
        .select({ count: count() })
        .from(snippets)
        .where(eq(snippets.slug, slug));

      if (Number(existingCount) === 0) {
        // No existe, lo podemos usar
        break;
      }

      // Si existe, incrementamos y probamos con sufijo
      attempt++;
      slug = `${baseSlug}-${attempt}`;
    }
  } else {
    slug = currentSnippet.slug;
  }

  await db
    .update(snippets)
    .set({
      title: rawFormData.title as string,
      slug,
      language: rawFormData.language as string,
      code: value as string,
      tags: tags as string[],
      summary: rawFormData.summary as string,
      visibility: rawFormData.visibility as "public" | "private",
      userId: userId as string,
    })
    .where(eq(snippets.id, id));

  revalidatePath(`/${username}/snippets`);
  redirect(`/${username}/snippets/${slug}`);
}

export async function deleteSnippet(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  upsertUser(user);

  const userId = user.id;

  const snippet = await db.select().from(snippets).where(eq(snippets.id, id));

  if (snippet.length === 0) {
    throw new Error("Snippet not found");
  }

  const currentSnippet = snippet[0];

  if (userId !== currentSnippet.userId) {
    throw new Error("You are not the owner of this snippet");
  }

  await db.delete(snippets).where(eq(snippets.id, id));
  revalidatePath(`/${user.username}/snippets`);
  redirect(`/${user.username}/snippets`);
}
