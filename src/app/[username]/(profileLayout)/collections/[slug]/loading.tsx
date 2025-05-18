import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="h-7 w-64" />
      <div className="grid sm:grid-cols-2 gap-6">
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
        <SnippetCardSkeleton />
      </div>
    </section>
  );
}
