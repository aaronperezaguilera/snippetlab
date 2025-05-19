import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="max-w-[1800px] mx-auto px-4 overflow-hidden md:overflow-visible">
        <div className="mt-[60px] min-h-[530px] relative xl:h-[calc(100vh-300px)] flex flex-col justify-center">
          <div className="relative flex flex-col gap-4 items-center xl:items-start xl:gap-8 z-10">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance max-w-[20ch] text-center xl:text-left">
              Create, share and discover code snippets
            </h1>
            <p className="text-muted-foreground text-xl text-balance text-center xl:text-left">
              Your collaborative snippet repository for programmers
            </p>
            <Button className="w-fit" asChild>
              <Link href="/sign-up">Sign up for SnippetLab</Link>
            </Button>
          </div>
          <div className="scale-100 xl:scale-90 mt-10 xl:mt-0 xl:absolute -right-[900px] top-40 xl:-rotate-x-24 xl:rotate-y-24 xl:rotate-z-24">
            <Image
              src="/hero.png"
              width={1920}
              height={1080}
              alt="Preview image"
              className="pointer-events-none shadow-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
