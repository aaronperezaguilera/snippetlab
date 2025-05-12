"use server";

import { db } from "@/db/drizzle";
import { snippets } from "@/db/schema";
import { formatSlug } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function createSnippet(
  value: string | undefined,
  tags: string[],
  formData: FormData
) {
  const rawFormData = {
    title: formData.get("title"),
    language: formData.get("language"),
    visibility: formData.get("visibility"),
    summary: formData.get("summary"),
  };

  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  // 3. Generar slug base
  const baseSlug = formatSlug(rawFormData.title as string);

  // 4. Encontrar un slug único
  let slug = baseSlug;
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

  await db.insert(snippets).values({
    title: rawFormData.title as string,
    slug,
    language: rawFormData.language as string,
    code: value as string,
    tags: tags as string[],
    summary: rawFormData.summary as string,
    visibility: rawFormData.visibility as "public" | "private",
    userId: userId as string,
  });

  revalidatePath(`/${username}/snippets`);
  redirect(`/${username}/snippets/${slug}`);
}
