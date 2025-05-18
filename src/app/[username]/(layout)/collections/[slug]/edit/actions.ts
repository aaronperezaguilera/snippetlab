"use server";

import { db } from "@/db/drizzle";
import { collections } from "@/db/schema";
import { formatSlug } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function updateCollection(id: number, formData: FormData) {
  const { title, visibility, description } = {
    title: formData.get("title"),
    description: formData.get("description"),
    visibility: formData.get("visibility"),
  };

  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  const baseSlug = formatSlug(title as string);

  let slug = baseSlug;
  let attempt = 0;

  while (true) {
    const [{ count: existingCount }] = await db
      .select({ count: count() })
      .from(collections)
      .where(eq(collections.slug, slug));

    if (Number(existingCount) === 0) {
      break;
    }

    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  await db
    .update(collections)
    .set({
      slug,
      title: title as string,
      description: description as string,
      visibility: visibility as "public" | "private",
      userId,
    })
    .where(eq(collections.id, id));

  revalidatePath(`/${username}/collections`);
  redirect(`/${username}/collections/${slug}?updated=true`);
}

export async function deleteCollection(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  upsertUser(user);

  const userId = user.id;

  const [collection] = await db
    .select()
    .from(collections)
    .where(eq(collections.id, id));

  if (!collection) {
    throw new Error("Collection not found");
  }

  if (userId !== collection.userId) {
    throw new Error("You are not the owner of this collection");
  }

  await db.delete(collections).where(eq(collections.id, id));
  revalidatePath(`/${user.username}/collections`);
  redirect(`/${user.username}/collections`);
}
