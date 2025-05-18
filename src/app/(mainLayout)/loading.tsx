import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <>
      <section className="flex flex-col gap-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-balance">Welcome back</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Generate your snippet with AI</h2>
          <div className="relative">
            <Textarea
              placeholder="Describe your snippet"
              className="resize-none pr-16 max-h-24 h-full"
              maxLength={300}
              name="prompt"
              required
            />
            <Button
              size="icon"
              type="submit"
              disabled
              className="absolute top-3 right-3 hover:bg-gradient-to-br border bg-background text-white hover:from-blue-800/80 hover:to-purple-800/80 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Feed</h1>
          </div>
          <div className="flex flex-col gap-4">
            <SnippetCardSkeleton />
            <SnippetCardSkeleton />
            <SnippetCardSkeleton />
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 pr-16">
          <h2 className="text-xl font-bold">Featured snippets</h2>
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
        <section className="flex flex-col gap-4 pr-16">
          <h2 className="text-xl font-bold">Featured users</h2>
          <div className="flex flex-col gap-2">
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
          </div>
        </section>
      </div>
    </>
  );
}
