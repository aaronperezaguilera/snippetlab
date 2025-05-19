import { SnippetCardSkeleton } from "@/components/skeletons/snippet-card-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-semibold">Snippets</h1>

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
      <SnippetCardSkeleton showAuthor={false} />
      <SnippetCardSkeleton showAuthor={false} />
      <SnippetCardSkeleton showAuthor={false} />
    </div>
  );
}
