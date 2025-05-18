import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="h-[calc(100vh-calc(var(--spacing)*4)-calc(var(--spacing)*16))] flex items-center relative overflow-hidden">
        <div className="p-32 flex flex-col gap-8 z-20">
          <h1 className="text-6xl font-bold text-balance max-w-[20ch]">
            Create, share and discover code snippets
          </h1>
          <p className="text-muted-foreground text-xl">
            Your collaborative snippet repository for programmers
          </p>
          <Button className="w-fit" asChild>
            <Link href="/sign-up">Sign up for SnippetLab</Link>
          </Button>
        </div>
        <div className="shadow-xl scale-100 sm:scale-100 md:scale-[0.9] lg:scale-[0.7] xl:scale-70 2xl:scale-90 mt-10 md:mt-0 lg:absolute -right-[420px] -top-[100px] md:top-[0px] 2xl:top-[100px] z-10">
          <Image
            src="/hero.png"
            width={1920}
            height={1080}
            alt="Preview image"
            className="-right-80 pointer-events-none"
          />
        </div>
      </section>
    </main>
  );
}
