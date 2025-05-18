"use server";

import { upsertUser } from "@/db";
import { db } from "@/db/drizzle";
import { collections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updatePin(id: number, pin: boolean) {
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

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

  await db
    .update(collections)
    .set({
      pinned: pin,
    })
    .where(eq(collections.id, id));

  revalidatePath(`/${username}/snippets`);
}
