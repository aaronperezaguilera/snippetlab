import { Hero } from "@/components/home/hero";

export default function HomePage() {
  return (
    <main className="overflow-hidden relative">
      <div className="w-full h-full absolute top-0 left-0 from-neutral-600/20 to-background bg-radial -z-10"></div>
      <Hero />
      <section className="max-w-[1800px] p-16 mx-auto grid grid-cols-12 gap-8 mt-16">
        <header className="col-span-12">
          <h2 className="text-6xl lg:text-8xl font-medium text-balance max-w-[20ch] text-center xl:text-left">
            All you need to do is code
          </h2>
        </header>
        <article className="border col-span-12 grid grid-cols-2 gap-8 rounded-md">
          <div></div>
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="text-2xl">Create & Share Snippets</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Publish your code snippets in seconds with our fully integrated
              Monaco editor with syntax highlighting. Share each snippet via a
              unique link and get feedback from the community.
            </p>
          </div>
        </article>
        <article className="border flex flex-col gap-8 col-span-8 rounded-md">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="text-2xl">Version History & Restore</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Every time you edit a snippet, we automatically save the previous
              version. Navigate through the change history with visual diffs and
              restore any version instantly with a single click.
            </p>
          </div>
          <div></div>
        </article>
        <article className="border flex flex-col gap-8 col-span-4 rounded-md">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="text-2xl">Organize into Collections</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Group your snippets in public or private collections. Create
              thematic folders (API Helpers, UI Components...) and keep your
              code library perfectly organized and accessible.
            </p>
          </div>
          <div></div>
        </article>
        <article className="border col-span-12 grid grid-cols-2 gap-8 rounded-md">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="text-2xl">Q&A Forum</h3>
            <p className="max-w-[60ch] text-muted-foreground text-pretty">
              Ask questions directly in any snippet and get answers from the
              community. Embed code in your questions and solutions to discuss
              real programming challenges.
            </p>
          </div>
          <div></div>
        </article>
        <article className="border flex flex-col gap-8 col-span-4 rounded-md">
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
        <article className="border flex flex-col gap-8 col-span-8 rounded-md">
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
        <article className="border col-span-12 flex flex-col gap-8 rounded-md">
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
