import { Skeleton } from "../ui/skeleton";

export function CollectionCardSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-4 border-b relative">
      <Skeleton className="h-7 w-1/2" />

      <Skeleton className="h-5 w-24" />
    </div>
  );
}
