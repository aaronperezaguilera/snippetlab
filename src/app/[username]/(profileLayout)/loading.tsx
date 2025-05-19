import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Pinned snippets</h2>
        <div className="grid grid-cols-2 gap-4">
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
          <div className="flex flex-col gap-2">
            <div className="p-4 flex flex-col gap-4 border-b relative">
              <Skeleton className="h-7 w-1/2" />

              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Pinned collections</h2>
        <div className="grid grid-cols-2 gap-4">
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
          <div className="flex flex-col gap-2">
            <div className="p-4 flex flex-col gap-4 border-b relative">
              <Skeleton className="h-7 w-1/2" />

              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
