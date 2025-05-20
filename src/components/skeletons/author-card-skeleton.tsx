import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function AuthorCardSkeleton() {
  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        className={`pr-4 pl-2 py-2 h-full -translate-x-2 w-full z-50 flex justify-start`}
      >
        <Skeleton className="h-20 w-20" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
          <Skeleton className="w-12 h-4" />
          <Skeleton className="h-6 w-48" />
        </div>
      </Button>
    </div>
  );
}
