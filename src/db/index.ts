import { User } from "@clerk/nextjs/server";
import { collections, follows, snippets, users } from "./schema";
import { db } from "./drizzle";
import { desc, eq, sum, and, isNull, ne } from "drizzle-orm";

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
export async function getFeaturedUsers(authenticatedUserId: string) {
  const usersWithLikes = await db
    .select({
      user: users,
      totalLikes: sum(snippets.likesCount).as("totalLikes"),
    })
    .from(users)
    .leftJoin(snippets, eq(snippets.userId, users.id))
    .leftJoin(
      follows,
      and(
        eq(follows.followerId, authenticatedUserId),
        eq(follows.followingId, users.id)
      )
    )

    .where(and(isNull(follows.followerId), ne(users.id, authenticatedUserId)))
    .groupBy(users.id)
    .orderBy(desc(sum(snippets.likesCount)))
    .limit(3);

  return usersWithLikes;
}

export async function getFeaturedSnippets(authenticatedUserId: string) {
  const snippetsWithLikes = await db
    .select()
    .from(snippets)
    .leftJoin(
      follows,
      and(
        eq(follows.followerId, authenticatedUserId),
        eq(follows.followingId, snippets.userId)
      )
    )
    .leftJoin(users, eq(users.id, snippets.userId))
    .where(
      and(isNull(follows.followerId), ne(snippets.userId, authenticatedUserId))
    )
    .groupBy(snippets.id, follows.id, users.id)
    .orderBy(desc(sum(snippets.likesCount)))
    .limit(3);

  return snippetsWithLikes;
}

export async function getUserCollections(userId: string) {
  const collectionsList = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId));

  return collectionsList;
}
