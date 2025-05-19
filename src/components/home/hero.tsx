import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="grid  xl:grid-cols-2 gap-16 mx-auto px-4 overflow-hidden md:overflow-visible">
      <div className="mt-16 p-16 relative xl:h-[calc(100vh-300px)] flex flex-col justify-center">
        <div className="flex flex-col gap-4 items-center xl:items-start xl:gap-8 z-10">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#fafafa]/80 to-neutral-300/30 text-4xl lg:text-6xl font-semibold text-balance max-w-[20ch] text-center xl:text-left">
            Create, share and discover code snippets
          </h1>
          <p className="text-muted-foreground text-xl text-balance text-center xl:text-left">
            Your collaborative snippet repository for programmers
          </p>
          <Button className="w-fit" asChild>
            <Link href="/sign-up">Sign up for SnippetLab</Link>
          </Button>
        </div>
      </div>
      <div className="xl:scale-200 2xl:scale-150 flex items-center 2xl:-translate-x-20">
        <Image
          src="/screenshot.png"
          width={1920}
          height={1080}
          alt="Preview image"
          className="pointer-events-none shadow-2xl rounded-sm overflow-hidden"
        />
      </div>
    </section>
  );
}
