import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 px-8 mt-4">
      <h1 className="text-2xl font-semibold">Comments</h1>
      <div className="mt-4 flex flex-col">
        <Textarea disabled rows={3} placeholder="Write a comment..." required />
        <Button type="submit" disabled className="mt-2 self-end btn-primary">
          Comment
        </Button>
      </div>
      <div className="p-4 border-b flex flex-col relative gap-5">
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
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-50" />
      </div>
      <div className="p-4 border-b flex flex-col relative gap-5">
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
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-50" />
      </div>
      <div className="p-4 border-b flex flex-col relative gap-5">
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
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-50" />
      </div>
    </div>
  );
}
