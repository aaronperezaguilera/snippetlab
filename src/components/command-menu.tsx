"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import {
  Book,
  Code2,
  Heart,
  Home,
  MessageSquare,
  MessagesSquare,
  Settings,
  Telescope,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const { user } = useUser();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (open) {
      setSearch("");
    }
  }, [open]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        className={cn(
          "relative h-8 w-full justify-start bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-sm lg:w-xl xl:w-2xl"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search anything...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="bg-background pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setSearch}
        />
        <CommandList>
          {search.length > 0 && (
            <CommandGroup heading="Search" forceMount>
              <CommandItem
                forceMount
                value={`search-users:${search}`}
                onSelect={() => {
                  runCommand(() => router.push("/"));
                }}
              >
                <User className="size-4" /> Search
                {search && (
                  <span className="text-muted-foreground">{search}</span>
                )}
                on users
              </CommandItem>
              <CommandItem
                forceMount
                value={`search-snippets:${search}`}
                onSelect={() => {
                  runCommand(() => router.push("/"));
                }}
              >
                <Code2 className="size-4" /> Search
                {search && (
                  <span className="text-muted-foreground">{search}</span>
                )}
                on snippets
              </CommandItem>
            </CommandGroup>
          )}
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/"));
              }}
            >
              <Home className="size-4" />
              Home
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push(`/${user?.username}`));
              }}
            >
              <User className="size-4" />
              Your profile
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push(`/${user?.username}/snippets`));
              }}
            >
              <Code2 className="size-4" /> Your snippets
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push(`/${user?.username}/collections`));
              }}
            >
              <Book className="size-4" /> Your collections
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push(`/${user?.username}/likes`));
              }}
            >
              <Heart className="size-4" /> Your liked snippets
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push(`/${user?.username}/questions`));
              }}
            >
              <MessageSquare className="size-4" /> Your questions
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/forum"));
              }}
            >
              <MessagesSquare className="size-4" />
              Q&A Forum
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/explore"));
              }}
            >
              <Telescope className="size-4" />
              Explore
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/account"));
              }}
            >
              <Settings className="size-4" />
              Account settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
