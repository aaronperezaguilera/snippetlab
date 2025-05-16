import { currentUser } from "@clerk/nextjs/server";
import { SnippetsWidget } from "@/components/snippets-widget";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ForumFeed } from "@/components/forum-feed";

export default async function ForumPage() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">You need to be logged in</h1>
        <p className="mt-4">
          Please log in to view your snippets and explore the community.
        </p>
      </div>
    );
  }

  return (
    <main className="mt-16 grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-16 relative min-h-screen">
      <SnippetsWidget />
      <section className="flex flex-col gap-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-balance">Q&A Forum</h1>
          <Button>
            <Link href="/forum/new" className="flex items-center gap-2">
              <Plus /> Create a question
            </Link>
          </Button>
        </header>
        <ForumFeed />
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-bold">Your questions</h2>
      </section>
    </main>
  );
}
