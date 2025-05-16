import { db } from "@/db/drizzle";
import { follows, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { sql, eq, and } from "drizzle-orm";
import Image from "next/image";
import { FollowButton } from "./follow-button";
import { ProfileDetails } from "./profile-details";

export async function Profile({ username }: { username: string }) {
  const authenticatedUser = await currentUser();

  const followersSubquery = db
    .select({
      followingId: follows.followingId,
      count: sql<number>`COUNT(*)`.as("followers"),
    })
    .from(follows)
    .groupBy(follows.followingId)
    .as("followers_count");

  const followingSubquery = db
    .select({
      followerId: follows.followerId,
      count: sql<number>`COUNT(*)`.as("following"),
    })
    .from(follows)
    .groupBy(follows.followerId)
    .as("following_count");

  const [user] = await db
    .select({
      users,
      followers: followersSubquery.count,
      following: followingSubquery.count,
    })
    .from(users)
    .leftJoin(followersSubquery, eq(users.id, followersSubquery.followingId))
    .leftJoin(followingSubquery, eq(users.id, followingSubquery.followerId))
    .where(eq(users.username, username));

  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  const author = user.users;

  const followed = authenticatedUser?.id
    ? await db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.followerId, authenticatedUser.id),
            eq(follows.followingId, user.users.id)
          )
        )
    : [];
  return (
    <section className="flex gap-8">
      <div className="aspect-square bg-neutral-600 overflow-hidden w-64 h-64 flex-shrink-0">
        {author.image_url && (
          <Image
            src={author.image_url as string}
            width={1000}
            height={1000}
            alt="Profile"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 w-full">
        <ProfileDetails profile={author} />
        {author.id !== authenticatedUser?.id && (
          <FollowButton
            id={author.id}
            initialFollowed={followed.length > 0 ? true : false}
          />
        )}
      </div>
    </section>
  );
}
