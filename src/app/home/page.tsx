import { CollectionsCard } from "@/components/home/collections-card";
import { CreateCard } from "@/components/home/create-card";
import { ForumCard } from "@/components/home/forum-card";
import { Hero } from "@/components/home/hero";
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
        <VersionsCard />
        <CollectionsCard />
        <ForumCard />
        <article className="border flex flex-col gap-8 col-span-4 rounded-sm overflow-hidden">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="text-2xl">Fork & Collaborate</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Like a snippet from another user? Fork it to duplicate it in your
              account, modify what you need and contribute back or create your
              own improved version.
            </p>
          </div>
          <div></div>
        </article>
        <article className="border flex flex-col gap-8 col-span-8 rounded-sm overflow-hidden">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="text-2xl">Social Feed & Following</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Follow other developers and discover their work in your
              personalized feed. Keep up to date with new snippets, likes and
              forks from the people who inspire you.
            </p>
          </div>
          <div></div>
        </article>
        <article className="border col-span-12 flex flex-col gap-8 rounded-sm overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-4 p-8 text-center">
            <h3 className="text-2xl">Secure Authentication with Clerk</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Access with email/password or through external providers (Google,
              GitHub) thanks to Clerk. Production-ready security and scalability
              for your snippets project.
            </p>
          </div>
          <div></div>
        </article>
      </section>
    </main>
  );
}
