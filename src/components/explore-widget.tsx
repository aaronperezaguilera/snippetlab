import { currentUser } from "@clerk/nextjs/server";
import { getFeaturedSnippets } from "@/db";
import { SnippetCard } from "./snippet-card";
import Link from "next/link";

export async function ExploreWidget() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to see snippets.</div>;
  }

  const featuredSnippets = await getFeaturedSnippets(user.id);

  if (featuredSnippets.length === 0) return;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Featured snippets</h2>
      <div>
        {featuredSnippets.map(
          ({ snippets, users }) =>
            users &&
            snippets && (
              <SnippetCard
                snippet={snippets}
                author={users}
                key={snippets.id}
                showCode={false}
                showUsername
                className="bg-transparent border-t-0 border-x-0 rounded-none"
              />
            )
        )}
      </div>

      <Link
        href={`/explore`}
        className=" hover:underline text-muted-foreground text-sm w-fit mt-2"
      >
        Show more
      </Link>
    </section>
  );
}
