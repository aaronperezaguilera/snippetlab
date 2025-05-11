import { Logo, LogoMuted } from "./logo";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, Plus, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { SignOutButton } from "./sign-out-button";

export async function Header() {
  const user = await currentUser();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 bg-neutral-900 border-b border-neutral-800">
      <Link href="/" className="flex gap-2 items-center">
        <Logo />
        <span className="text-xl font-semibold">SnippetLab</span>
      </Link>
      <div>
        <Input className="w-2xl" />
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Plus /> <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem asChild>
                  <Link href={`${user?.username}/snippets/new`}>
                    Create Snippet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Create Collection</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Image
                  src={user?.imageUrl || "/default-avatar.png"}
                  alt={`${user?.username || "User"}'s profile picture`}
                  width={100}
                  height={100}
                  className="w-9 h-9 border"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/${user?.username}`}>
                    <User />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <Settings />
                    Account settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/home`}>
                    <LogoMuted />
                    Home Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <div>
                    <SignOutButton />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" className="flex items-center gap-2">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="flex items-center gap-2">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
