"use server";

import { db } from "@/db/drizzle";
import { snippets, snippetVersions } from "@/db/schema";
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
  const { title, language, visibility, summary, examples } = {
    title: formData.get("title"),
    language: formData.get("language"),
    visibility: formData.get("visibility"),
    summary: formData.get("summary"),
    examples: formData.get("examples"),
  };

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  upsertUser(user);

  const userId = user.id;
  const username = user.username;

  const [snippet] = await db.select().from(snippets).where(eq(snippets.id, id));

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  if (userId !== snippet.userId) {
    throw new Error("You are not the owner of this snippet");
  }

  let slug;

  if (snippet.title !== title) {
    const baseSlug = formatSlug(title as string);
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
    slug = snippet.slug;
  }

  await db.insert(snippetVersions).values([
    {
      snippetId: id,
      code: snippet.code,
    },
  ]);

  await db
    .update(snippets)
    .set({
      title: title as string,
      slug,
      language: language as string,
      code: value as string,
      tags: tags as string[],
      summary: summary as string,
      visibility: visibility as "public" | "private",
      examples: examples ? JSON.parse(examples as string) : [],
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
