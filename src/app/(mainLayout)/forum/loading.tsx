import { QuestionCardSkeleton } from "@/components/skeletons/question-card-skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export default function Loading() {
  return (
    <>
      <section className="flex flex-col gap-8 pt-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-balance">Q&A Forum</h1>
          <Button disabled>
            <Plus /> Create a question
          </Button>
        </header>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Latest questions</h1>
          </div>
          <div className="flex flex-col">
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
          </div>
        </div>
      </section>
      <section className="flex flex-col bg-popover border-l px-8 pt-8">
        <h2 className="text-xl font-bold mb-4">Your questions</h2>
        <div className="flex flex-col gap-2">
          <div className="p-4 flex flex-col gap-4 border-b relative">
            <Skeleton className="h-7 w-1/2" />

            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-4 flex flex-col gap-4 border-b relative">
            <Skeleton className="h-7 w-1/2" />

            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-4 flex flex-col gap-4 border-b relative">
            <Skeleton className="h-7 w-1/2" />

            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </section>
    </>
  );
}
