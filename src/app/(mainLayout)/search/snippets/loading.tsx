import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-4 py-8">
      <h1 className="text-2xl font-semibold">Search</h1>

      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
    </section>
  );
}
