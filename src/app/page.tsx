import { currentUser } from "@clerk/nextjs/server";
import HomePage from "./home/page";
import { Feed } from "@/components/feed";
import { SnippetsWidget } from "@/components/snippets-widget";
import { FeaturedUsers } from "@/components/featured-users";
import { ExploreWidget } from "@/components/explore-widget";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <HomePage />;
  }

  return (
    <main className="mt-16 grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-16 relative min-h-screen">
      <SnippetsWidget />
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-balance">
          Welcome back, {user.firstName}
        </h1>
        <Feed />
      </section>
      <div className="flex flex-col gap-8">
        <ExploreWidget />
        <FeaturedUsers />
      </div>
    </main>
  );
}
