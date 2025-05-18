import { CollectionCardSkeleton } from "@/components/skeletons/collection-card-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Collections</h1>

      <div className="flex gap-2">
        <Input
          disabled
          placeholder="Search collections..."
          className="w-full"
        />

        <Button disabled>
          <PlusIcon /> Create
        </Button>
      </div>
      <div>
        <CollectionCardSkeleton />
        <CollectionCardSkeleton />
        <CollectionCardSkeleton />
      </div>
    </div>
  );
}
