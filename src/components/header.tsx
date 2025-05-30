import { Logo, LogoMuted } from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowUpRightFromSquare,
  ChevronDown,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { SidebarToggleButton } from "./sidebar";
import { SignOutButton } from "./sign-out-button";
import { CommandMenu } from "./command-menu";
import { Icons } from "./ui/icons";

export async function Header() {
  const user = await currentUser();

  return (
    <header
      className={`flex justify-between items-center p-4 gap-4 h-16 ${
        user ? "bg-popover border-b" : "bg-background"
      }`}
      id="top"
    >
      <div className="flex items-center gap-4">
        {user && <SidebarToggleButton />}
        <Link href="/" className="flex gap-2 items-center">
          <Logo className="size-8" />
          <span className="text-xl font-semibold">SnippetLab</span>
        </Link>
      </div>
      {user && (
        <div className="hidden w-full flex-1 lg:flex lg:w-auto lg:flex-none">
          <CommandMenu />
        </div>
      )}
      <div className="flex items-center gap-4">
        <a
          href="https://snippetlab.featurebase.app/en/roadmap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Roadmap <ArrowUpRightFromSquare size={14} />
        </a>
        <a
          href="https://github.com/aaronperezaguilera/snippetlab"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Source code <Icons.gitHub className="size-4" />
        </a>
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
                  <Link href={`/${user?.username}/snippets/new`}>
                    Create Snippet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user?.username}/collections/new`}>
                    Create Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/forum/new`}>Create Question</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer rounded-sm overflow-hidden">
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
