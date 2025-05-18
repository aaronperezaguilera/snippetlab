import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-4 px-16">
      <Skeleton className="h-50 w-full" />
      <div>
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-50 w-full" />
      </div>
    </section>
  );
}
