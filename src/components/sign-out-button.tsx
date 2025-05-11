"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className="flex items-center gap-2 cursor-pointer"
    >
      <LogOut />
      Sign out
    </button>
  );
};
