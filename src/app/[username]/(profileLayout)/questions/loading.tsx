import { QuestionCardSkeleton } from "@/components/skeletons/question-card-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Questions</h1>

      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
    </div>
  );
}
