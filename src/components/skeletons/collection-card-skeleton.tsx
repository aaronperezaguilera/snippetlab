import { Skeleton } from "../ui/skeleton";
import { Folder } from "lucide-react";

export function CollectionCardSkeleton() {
  return (
    <div className="p-4 flex items-center relative gap-4 rounded-sm border bg-card hover:bg-neutral-800 transition-colors">
      <Folder className="size-10 fill-muted-foreground stroke-muted-foreground" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-7 w-64" />

        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}
