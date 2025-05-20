import { currentUser } from "@clerk/nextjs/server";
import { FeaturedUsers } from "@/components/featured-users";
import { ExploreWidget } from "@/components/explore-widget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - SnippetLab",
  description: "Search snippets and users",
};

export default async function SearchPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">Please log in to search</h1>
      </div>
    );
  }

  return (
    <>
      {children}
      <div className="relative bg-popover border-l">
        <div className="flex flex-col gap-8 pt-8  px-8 sticky top-0">
          <ExploreWidget />
          <FeaturedUsers />
        </div>
      </div>
    </>
  );
}
