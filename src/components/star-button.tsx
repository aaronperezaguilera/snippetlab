"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { updateStar } from "@/app/[username]/snippets/actions";
import { Heart } from "lucide-react";
import { Badge } from "./ui/badge";

export function StarButton({
  id,
  initialStarred,
  initiallikes,
}: {
  id: number;
  initialStarred: boolean;
  initiallikes: number;
}) {
  const [isStarred, addOptimisticStar] = useOptimistic(
    initialStarred,
    (prev: boolean, next: boolean) => next
  );

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const nextState = !isStarred;
      addOptimisticStar(nextState);
      updateStar(id, nextState);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="secondary" disabled={isPending}>
        <Heart fill={isStarred ? "#fafafa" : undefined} />
        {isStarred ? "Liked" : "Like"}
        <Badge variant="secondary">{initiallikes}</Badge>
      </Button>
    </form>
  );
}
