import { ProfileNav } from "@/components/profile-nav";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto mt-16 grid grid-cols-[1fr_3fr] gap-16 ">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <span className="text-muted-foreground">Author</span>
        <div className="flex gap-3 items-center mt-2">
          <Skeleton className="h-12 w-12" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <ProfileNav active="snippets" />
        <header className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <Skeleton className="h-4 w-24" />
          </div>
        </header>

        <Skeleton className="h-64 w-full" />
        <h2 className="text-2xl font-bold mb-2">Summary</h2>
        <Skeleton className="h-64 w-full" />
      </section>
    </main>
  );
}
