"use server";

import { db } from "@/db/drizzle";
import { collections } from "@/db/schema";
import { formatSlug } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function createCollection(formData: FormData) {
  const { title, visibility, description } = {
    title: formData.get("title") as string,
    description: formData.get("description") as string | null,
    visibility: formData.get("visibility") as string,
  };

  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  // 3. Generar slug base
  const baseSlug = formatSlug(title as string);

  // 4. Encontrar un slug único
  let slug = baseSlug;
  let attempt = 0;

  while (true) {
    // Contar cuántos snippets ya tienen este slug
    const [{ count: existingCount }] = await db
      .select({ count: count() })
      .from(collections)
      .where(eq(collections.slug, slug));

    if (Number(existingCount) === 0) {
      // No existe, lo podemos usar
      break;
    }

    // Si existe, incrementamos y probamos con sufijo
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  await db.insert(collections).values({
    slug,
    title: title as string,
    description: description as string | null,
    visibility: visibility as "public" | "private",
    userId,
  });

  revalidatePath(`/${username}/collections`);
  redirect(`/${username}/collections`);
}
