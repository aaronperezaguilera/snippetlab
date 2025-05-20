import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings - SnippetLab",
  description: "Account Settings",
};

export default function AccountPage() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen">
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </main>
  );
}
