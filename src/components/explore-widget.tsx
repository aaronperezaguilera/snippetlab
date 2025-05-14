import { currentUser } from "@clerk/nextjs/server";
import { getFeaturedSnippets, getFeaturedUsers } from "@/db";
import { SnippetCard } from "./snippet-card";

export async function ExploreWidget() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to see snippets.</div>;
  }

  const featuredSnippets = await getFeaturedSnippets(user.id);

  if (featuredSnippets.length === 0) return;

  return (
    <section className="flex flex-col gap-4 pr-16">
      <h2 className="text-xl font-bold">Featured snippets</h2>
      <div className="flex flex-col gap-2">
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
              />
            )
        )}
      </div>
    </section>
  );
}
