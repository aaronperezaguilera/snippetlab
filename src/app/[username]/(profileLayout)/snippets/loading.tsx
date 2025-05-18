import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Snippets</h1>

      <div className="flex gap-2">
        <Input disabled className="w-full" placeholder="Search snippets..." />
        <Select>
          <SelectTrigger disabled className="w-[180px]">
            Type
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger disabled className="w-[180px]">
            Language
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger disabled className="w-[180px]">
            Sort by
          </SelectTrigger>
        </Select>

        <Button disabled>
          <PlusIcon /> Create
        </Button>
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
      <div className="p-4 flex flex-col gap-4 border-b relative">
        <Skeleton className="h-7 w-1/2" />

        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
