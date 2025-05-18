import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
export default function LoadingPage() {
  return (
    <main className="container mx-auto mt-16 relative min-h-screen">
      <div className="flex flex-col gap-4 overflow-hidden">
        <h1 className="text-2xl font-bold">Snippets</h1>

        <div className="p-4 flex flex-col gap-4 border-b relative">
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
          <Skeleton className="h-7 w-1/2" />

          <Skeleton className="h-50 w-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="p-4 flex flex-col gap-4 border-b relative">
          <Skeleton className="h-7 w-1/2" />

          <Skeleton className="h-50 w-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="p-4 flex flex-col gap-4 border-b relative">
          <Skeleton className="h-7 w-1/2" />

          <Skeleton className="h-50 w-full" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </main>
  );
}
