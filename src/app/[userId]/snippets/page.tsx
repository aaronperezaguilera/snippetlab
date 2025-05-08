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
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function SnippetsPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute();

  return (
    <main className="container mx-auto grid grid-cols-[1fr_3fr] gap-16 mt-16">
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-square bg-neutral-600">
          {user[0]?.image_url && (
            <img
              src={user[0].image_url}
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
        <div className="flex gap-2 border p-1 items-center w-fit">
          <Link href="/user" className="px-2 border border-transparent">
            Profile
          </Link>
          <Link href="/user/snippets" className="px-2 border bg-neutral-800">
            Snippets
          </Link>
          <Link
            href="/user/collections"
            className="px-2 border border-transparent"
          >
            Collections
          </Link>
        </div>
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
          <Button asChild>
            <Link href="/user/snippets/new">
              <PlusIcon /> Create
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
