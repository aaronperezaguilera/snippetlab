import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="h-screen grid grid-cols-2 items-center relative overflow-hidden">
        <div className="p-8 flex flex-col gap-8">
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
        <Image
          src="/preview.png"
          width={1920}
          height={1080}
          alt="Preview image"
          className="absolute -top-20 -right-80 max-w-10/12 pointer-events-none"
        />
      </section>
    </main>
  );
}
