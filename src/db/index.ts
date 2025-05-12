import { User } from "@clerk/nextjs/server";
import { users } from "./schema";
import { db } from "./drizzle";

export async function upsertUser(user: User | null) {
  if (!user) {
    return;
  }
  await db
    .insert(users)
    .values({
      id: user.id,
      username: user.username ?? "username",
      first_name: user.firstName ?? null,
      last_name: user.lastName ?? null,
      image_url: user.imageUrl ?? null,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    })
    .onConflictDoNothing();
}
