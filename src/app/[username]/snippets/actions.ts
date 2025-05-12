"use server";

import { db } from "@/db/drizzle";
import { pins, snippets, stars } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { upsertUser } from "@/db";

export async function updatePin(id: number, pin: boolean) {
  // 1. Obtener el usuario actual
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  // 2. Obtener el snippet
  const snippet = await db.select().from(snippets).where(eq(snippets.id, id));

  if (snippet.length === 0) {
    throw new Error("Snippet not found");
  }

  const currentSnippet = snippet[0];

  // 3. Verificar si el usuario es el propietario del snippet
  if (userId !== currentSnippet.userId) {
    throw new Error("You are not the owner of this snippet");
  }

  // 4. Actualizar el snippet para marcarlo como "pinned"

  if (pin) {
    await db.insert(pins).values({
      snippetId: id,
      userId: userId,
    });
  } else {
    await db
      .delete(pins)
      .where(and(eq(pins.snippetId, id), eq(pins.userId, userId)));
  }

  // 5. Revalidar la ruta para mostrar los cambios
  revalidatePath(`/${username}/snippets`);
}

export async function updateStar(id: number, star: boolean) {
  // 1. Obtener el usuario actual
  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  // 2. Obtener el snippet
  const snippet = await db.select().from(snippets).where(eq(snippets.id, id));

  if (snippet.length === 0) {
    throw new Error("Snippet not found");
  }

  // 4. Actualizar el snippet para marcarlo como "pinned"

  if (star) {
    await db.insert(stars).values({
      snippetId: id,
      userId: userId,
    });
  } else {
    await db
      .delete(stars)
      .where(and(eq(stars.snippetId, id), eq(stars.userId, userId)));
  }

  // 5. Revalidar la ruta para mostrar los cambios
  revalidatePath(`/${username}/snippets`);
}
