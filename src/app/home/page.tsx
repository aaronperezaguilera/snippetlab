import { Hero } from "@/components/home/hero";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <section className="p-16 mx-auto grid grid-cols-2 gap-8 mt-16">
        <header className="col-span-2">
          <h2 className="text-6xl lg:text-8xl font-medium text-balance max-w-[20ch] text-center xl:text-left">
            All you need to do is code
          </h2>
        </header>
        <article className="border col-span-2">HOL</article>
      </section>
    </main>
  );
}
