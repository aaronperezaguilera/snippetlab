import { currentUser } from "@clerk/nextjs/server";
import { SnippetsWidget } from "@/components/snippets-widget";
import { FeaturedUsers } from "@/components/featured-users";
import { ExploreWidget } from "@/components/explore-widget";

export default async function SearchPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Please log in to search</h1>
      </div>
    );
  }

  return (
    <main className="mt-16 grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-16 relative min-h-screen">
      <SnippetsWidget />
      {children}
      <div className="flex flex-col gap-8">
        <ExploreWidget />
        <FeaturedUsers />
      </div>
    </main>
  );
}
