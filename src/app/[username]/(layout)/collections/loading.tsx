import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
      <div className="p-4 flex flex-col gap-4 border relative">
        <Skeleton className="h-7 w-1/2" />

        <Skeleton className="h-5 w-24" />
      </div>
      <div className="p-4 flex flex-col gap-4 border relative">
        <Skeleton className="h-7 w-1/2" />

        <Skeleton className="h-5 w-24" />
      </div>
      <div className="p-4 flex flex-col gap-4 border relative">
        <Skeleton className="h-7 w-1/2" />

        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}
