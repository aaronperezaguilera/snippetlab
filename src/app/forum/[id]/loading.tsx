import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto mt-16 flex flex-col gap-4 min-h-screen">
      <Button variant="ghost" className="w-fit" disabled>
        <ChevronLeft /> Return to forum
      </Button>
      <div className="flex items-center">
        <Button
          variant="ghost"
          className={`pr-4 pl-2 py-2 h-full -translate-x-2 w-fit z-50`}
        >
          <div className="flex gap-3 items-center">
            <Skeleton className="h-12 w-12" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-12 h-4" />
              </div>
              <span>
                <Skeleton className="w-12 h-4" />
              </span>
            </div>
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-4 pb-4 border-b">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-14 w-full" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="flex justify-end">
        <Button type="button">Answer this question</Button>
      </div>
      <h2 className="text-xl">Answers</h2>
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
      <SnippetCardSkeleton />
    </main>
  );
}
