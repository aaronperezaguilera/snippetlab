import { Profile } from "../profile";

export function SocialCard() {
  return (
    <article className="border flex flex-col gap-8 col-span-8 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Social Feed & Following</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Follow other developers and discover their work in your personalized
          feed. Keep up to date with new snippets, likes and forks from the
          people who inspire you.
        </p>
      </div>
      <div className="px-16 relative">
        <Profile username="janedoe" />
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full z-50"></div>
      </div>
    </article>
  );
}
