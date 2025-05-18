"use client";
import React, { createContext, useContext, useState } from "react";
import {
  Book,
  Bug,
  Code2,
  Heart,
  Home,
  Menu,
  MessageSquare,
  MessagesSquare,
  Settings,
  Telescope,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { useUser } from "@clerk/nextjs";

// Create context with default undefined to catch misuse
interface SidebarContextType {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  const user = useUser();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[60] ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 w-80 h-full bg-background text-white shadow-lg transition-transform duration-300 transform  z-[70] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <Link href="/" className="flex gap-2 items-center">
            <Logo />
            <span className="text-xl font-semibold">SnippetLab</span>
          </Link>
          <button
            aria-label="Close sidebar"
            className=" text-muted-foreground transition-colors hover:text-white cursor-pointer"
            onClick={closeSidebar}
          >
            <X />
          </button>
        </div>
        <nav className="p-4">
          <ul className="">
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <Home className="size-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <User className="size-4" />
                Your profile
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/snippets`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <Code2 className="size-4" /> Your snippets
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/collections`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <Book className="size-4" /> Your collections
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/likes`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <Heart className="size-4" /> Your liked snippets
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/questions`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <MessageSquare className="size-4" /> Your questions
              </Link>
            </li>
            <div className="w-full h-px bg-border my-2"></div>
            <li>
              <Link
                href={`/forum`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <MessagesSquare className="size-4" />
                Q&A Forum
              </Link>
            </li>
            <li>
              <Link
                href={`/explore`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <Telescope className="size-4" />
                Explore
              </Link>
            </li>
            <div className="w-full h-px bg-border my-2"></div>
            <li>
              <Link
                href={`/account`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                onClick={closeSidebar}
              >
                <Settings className="size-4" />
                Account settings
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/aaronperezaguilera/snippetlab/issues/new"
                className="flex items-center gap-2 px-2 py-1 hover:bg-accent/10"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeSidebar}
              >
                <Bug className="size-4" />
                Report a bug
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export function SidebarToggleButton() {
  const { isOpen, toggleSidebar } = useSidebar();
  return (
    <button
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      onClick={toggleSidebar}
      className="p-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-pointer"
    >
      {isOpen ? <X /> : <Menu />}
    </button>
  );
}
