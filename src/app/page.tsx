import { currentUser } from "@clerk/nextjs/server";
import HomePage from "./home/page";
import { Feed } from "@/components/feed";
import { SnippetsWidget } from "@/components/snippets-widget";
import { FeaturedUsers } from "@/components/featured-users";
import { ExploreWidget } from "@/components/explore-widget";
import { GenerateAISnippet } from "@/components/generate-ai-snippet";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <HomePage />;
  }

  return (
    <main className="mt-16 grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-16 relative min-h-screen">
      <SnippetsWidget />
      <section className="flex flex-col gap-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-balance">
          Welcome back, {user.firstName}
        </h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Generate your snippet with AI</h2>
          <GenerateAISnippet />
        </div>
        <Feed />
      </section>
      <div className="flex flex-col gap-8">
        <ExploreWidget />
        <FeaturedUsers />
      </div>
    </main>
  );
}
