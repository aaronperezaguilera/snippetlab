import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-4 px-8">
      <Skeleton className="h-50 w-full" />
    </section>
  );
}
