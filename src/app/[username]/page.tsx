import { FollowButton } from "@/components/follow-button";
import { ProfileNav } from "@/components/profile-nav";
import { SnippetCard } from "@/components/snippet-card";
import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { follows, snippets, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import Image from "next/image";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

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

  const user = await db
    .select({
      id: users.id,
      username: users.username,
      image_url: users.image_url,
      followers: followersSubquery.count,
      following: followingSubquery.count,
    })
    .from(users)
    .leftJoin(followersSubquery, eq(users.id, followersSubquery.followingId))
    .leftJoin(followingSubquery, eq(users.id, followingSubquery.followerId))
    .where(eq(users.username, username));

  if (!user[0]) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  const snippetsList = await db
    .select()
    .from(snippets)
    .where(eq(snippets.pinned, true));

  const followed = authenticatedUser?.id
    ? await db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.followerId, authenticatedUser.id),
            eq(follows.followingId, user[0].id)
          )
        )
    : [];

  return (
    <main className="container mx-auto grid grid-cols-[1fr_3fr] gap-16 mt-16">
      <section className="flex flex-col gap-4">
        <div className="w-full aspect-square bg-neutral-600">
          {user[0]?.image_url && (
            <Image
              src={user[0]?.image_url as string}
              width={1000}
              height={1000}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {user[0].id !== authenticatedUser?.id && (
          <FollowButton
            id={user[0].id}
            initialFollowed={followed.length > 0 ? true : false}
          />
        )}
        <Button className="w-full" variant="secondary">
          Edit profile
        </Button>
        <div>
          <span>{user[0].followers ? user[0].followers : 0} followers</span>
          <span className="ml-4">
            {user[0].following ? user[0].following : 0} following
          </span>
        </div>
      </section>
      <div className="flex flex-col gap-4">
        <ProfileNav username={user[0].username} active="profile" />
        <h1 className="text-2xl font-bold">Snippets</h1>
        {snippetsList.length > 0 ? (
          <div className="flex flex-col gap-4">
            {snippetsList.map(
              (snippet) =>
                (snippet.userId == authenticatedUser?.id ||
                  snippet.visibility === "public") && (
                  <SnippetCard
                    isPinned
                    key={snippet.id}
                    username={username}
                    {...snippet}
                  />
                )
            )}
          </div>
        ) : (
          <p>No snippets found</p>
        )}
      </div>
    </main>
  );
}
