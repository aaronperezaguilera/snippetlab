import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="flex flex-col gap-16 mt-16 lg:gap-32 lg:mt-32 max-w-[1800px] mx-auto px-4 overflow-visible relative">
      <div className="flex flex-col gap-8 items-center z-10">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-[#fafafa]/90 to-neutral-300/40 text-4xl lg:text-7xl font-semibold text-balance max-w-[20ch] text-center">
          Create, share and discover code snippets
        </h1>
        <p className="text-muted-foreground text-xl text-balance text-center">
          Your collaborative snippet repository for programmers
        </p>
        <Button className="w-fit" asChild>
          <Link href="/sign-up">Sign up for SnippetLab</Link>
        </Button>
      </div>
      <Image
        src="/hero.png"
        width={1920}
        height={1080}
        alt="Preview image"
        className="pointer-events-none shadow-2xl rounded-sm overflow-hidden transform-[perspective(200em)translate(0%,-8%)scale(1)rotateX(34deg)rotateY(0deg)rotateZ(0deg)skewX(0deg)skewY(0deg)] origin-center "
      />
    </section>
  );
}
