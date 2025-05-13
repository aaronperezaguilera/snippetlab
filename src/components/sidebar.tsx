"use client";
import React, { createContext, useContext, useState } from "react";
import {
  BookMarked,
  Bug,
  Code2,
  Heart,
  Home,
  Menu,
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
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:underline flex items-center gap-2"
              >
                <Home className="size-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}`}
                className="hover:underline flex items-center gap-2"
              >
                <User className="size-4" />
                Your profile
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/snippets`}
                className="hover:underline flex items-center gap-2"
              >
                <Code2 className="size-4" /> Your snippets
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/collections`}
                className="hover:underline flex items-center gap-2"
              >
                <BookMarked className="size-4" /> Your collections
              </Link>
            </li>
            <li>
              <Link
                href={`/${user.user?.username}/likes`}
                className="hover:underline flex items-center gap-2"
              >
                <Heart className="size-4" /> Your loved snippets
              </Link>
            </li>
            <div className="w-full h-px bg-border"></div>
            <li>
              <Link
                href={`/explore`}
                className="hover:underline flex items-center gap-2"
              >
                <Telescope className="size-4" />
                QA Forum
              </Link>
            </li>
            <li>
              <Link
                href={`/explore`}
                className="hover:underline flex items-center gap-2"
              >
                <Telescope className="size-4" />
                Explore
              </Link>
            </li>
            <div className="w-full h-px bg-border"></div>
            <li>
              <Link
                href={`/account`}
                className="hover:underline flex items-center gap-2"
              >
                <Settings className="size-4" />
                Account settings
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/aaronperezaguilera/snippetlab/issues/new"
                className="hover:underline flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
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
