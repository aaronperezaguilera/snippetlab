import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function QuestionCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex items-center pl-2">
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
      <div className="flex flex-col gap-4 border bg-card p-4 rounded-sm relative">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-6 w-full" />

        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
