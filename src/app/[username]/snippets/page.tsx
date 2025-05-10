import { ProfileNav } from "@/components/profile-nav";
import { SnippetCard } from "@/components/snippet-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/db/drizzle";
import { pins, snippets, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    .where(eq(snippets.userId, user[0].id));

  const pinnedSnippets = await db
    .select()
    .from(pins)
    .where(eq(pins.userId, user[0].id));

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
        <ProfileNav username={user[0].username} active="snippets" />
        <h1 className="text-2xl font-bold">Snippets</h1>
        <div className="flex gap-2">
          <Input placeholder="Find a snippet..." />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {authenticatedUser?.id === user[0].id && (
            <Button asChild>
              <Link href={`/${username}/snippets/new`}>
                <PlusIcon /> Create
              </Link>
            </Button>
          )}
        </div>
        {snippetsList.length > 0 ? (
          <div className="flex flex-col gap-4">
            {snippetsList.map(
              (snippet) =>
                (snippet.userId == authenticatedUser?.id ||
                  snippet.visibility === "public") && (
                  <SnippetCard
                    isPinned={
                      pinnedSnippets.find(
                        (pin) => pin.snippetId === snippet.id
                      ) !== undefined
                    }
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
