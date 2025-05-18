"use server";

import { db } from "@/db/drizzle";
import { follows, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function updateFollow(id: string, following: boolean) {
  // 1. Obtener el usuario actual
  const authenticatedUser = await currentUser();

  upsertUser(authenticatedUser);

  if (!authenticatedUser) {
    throw new Error("User not found");
  }

  const userId = authenticatedUser.id;
  const username = authenticatedUser.username;

  // 2. Obtener el usuario
  const user = await db.select().from(users).where(eq(users.id, id));

  if (user.length === 0) {
    throw new Error("User not found");
  }

  // 4. Actualizar el snippet para marcarlo como "pinned"

  if (following) {
    await db.insert(follows).values({
      followerId: userId,
      followingId: id,
    });
  } else {
    await db
      .delete(follows)
      .where(and(eq(follows.followingId, id), eq(follows.followerId, userId)));
  }

  // 5. Revalidar la ruta para mostrar los cambios
  revalidatePath(`/${user[0].username}`);
  revalidatePath(`/${username}`);
  revalidatePath(`/`);
}

export async function updateProfile(formData: FormData) {
  const rawFormData = {
    bio: formData.get("bio"),
    website: formData.get("website"),
    github: formData.get("github"),
    x: formData.get("x"),
  };

  const authenticatedUser = await currentUser();

  upsertUser(authenticatedUser);

  if (!authenticatedUser) {
    throw new Error("User not found");
  }

  const userId = authenticatedUser.id;
  const username = authenticatedUser.username;

  const user = await db.select().from(users).where(eq(users.id, userId));

  if (user.length === 0) {
    throw new Error("User not found");
  }

  await db
    .update(users)
    .set({
      bio: rawFormData.bio as string,
      website: rawFormData.website as string,
      github: rawFormData.github as string,
      x: rawFormData.x as string,
    })
    .where(eq(users.id, userId));

  revalidatePath(`/${username}`);
}
