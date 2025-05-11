import { ProfileNav } from "@/components/profile-nav";
import { SnippetCard } from "@/components/snippet-card";
import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { pins, snippets, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import Image from "next/image";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const authenticatedUser = await currentUser();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .execute();

  if (!user[0]) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  const snippetsList = await db
    .select()
    .from(pins)
    .innerJoin(
      snippets,
      and(eq(snippets.id, pins.snippetId), eq(snippets.userId, user[0].id))
    )
    .where(
      and(eq(snippets.id, pins.snippetId), eq(snippets.userId, user[0].id))
    );

  return (
    <main className="container mx-auto grid grid-cols-[1fr_3fr] gap-16 mt-16">
      <div className="flex flex-col gap-4">
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
        <Button className="w-full" variant="secondary">
          Edit profile
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <ProfileNav username={user[0].username} active="profile" />
        <h1 className="text-2xl font-bold">Snippets</h1>
        {snippetsList.length > 0 ? (
          <div className="flex flex-col gap-4">
            {snippetsList.map(
              (pin) =>
                (pin.snippets.userId == authenticatedUser?.id ||
                  pin.snippets.visibility === "public") && (
                  <SnippetCard
                    isPinned
                    key={pin.snippets.id}
                    username={username}
                    {...pin.snippets}
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
