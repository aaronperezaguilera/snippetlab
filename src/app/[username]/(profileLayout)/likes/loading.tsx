import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Liked snippets</h1>

      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
    </div>
  );
}
