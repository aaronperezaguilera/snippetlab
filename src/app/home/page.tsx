import { ClerkCard } from "@/components/home/clerk-card";
import { CLICard } from "@/components/home/cli-card";
import { CollectionsCard } from "@/components/home/collections-card";
import { CreateCard } from "@/components/home/create-card";
import { ForkCard } from "@/components/home/fork-card";
import { ForumCard } from "@/components/home/forum-card";
import { Hero } from "@/components/home/hero";
import { SocialCard } from "@/components/home/social-card";
import { VersionsCard } from "@/components/home/versions-card";
export default function HomePage() {
  return (
    <main className="overflow-hidden relative">
      <Hero />
      <section className="max-w-[1800px] p-16 mx-auto grid grid-cols-12 gap-8">
        <header className="col-span-12">
          <h2 className="text-6xl lg:text-8xl font-medium text-balance max-w-[20ch] text-center xl:text-left">
            All you need to do is code
          </h2>
        </header>
        <CreateCard />
        <CollectionsCard />
        <VersionsCard />
        <ForumCard />
        <SocialCard />
        <ForkCard />
        <CLICard />
        <ClerkCard />
      </section>
    </main>
  );
}
