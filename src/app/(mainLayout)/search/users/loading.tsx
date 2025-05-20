import { AuthorCardSkeleton } from "@/components/skeletons/author-card-skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-4 py-8">
      <h1 className="text-2xl font-semibold">Search</h1>

      <AuthorCardSkeleton />
      <AuthorCardSkeleton />
      <AuthorCardSkeleton />
      <AuthorCardSkeleton />
      <AuthorCardSkeleton />
      <AuthorCardSkeleton />
    </section>
  );
}
