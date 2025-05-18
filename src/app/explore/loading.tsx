import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger } from "@/components/ui/select";

export default function Loading() {
  return (
    <main className="px-16 mx-auto grid grid-cols-[300px_1fr] gap-16 mt-16 min-h-screen">
      <section>
        <h1 className="text-2xl font-semibold mb-4">Explore</h1>
        <div className="flex flex-col gap-2">
          <Select disabled>
            <SelectTrigger className="w-[300px]">Language</SelectTrigger>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-[300px]">Sort by</SelectTrigger>
          </Select>
          <Input
            className="h-11"
            placeholder="Write or select a tag"
            disabled
          />
        </div>
      </section>
      <section>
        <div className="grid sm:grid-cols-2 gap-6">
          <SnippetCardSkeleton />
          <div className="flez gap-2 flex-wrap"></div>
        </div>
      </section>
    </main>
  );
}
