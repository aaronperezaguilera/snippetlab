"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { updateStar } from "@/app/[username]/snippets/actions";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

export function StarButton({
  id,
  initialStarred,
  initialStars,
}: {
  id: number;
  initialStarred: boolean;
  initialStars: number;
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
        <Star fill={isStarred ? "#fafafa" : undefined} />
        {isStarred ? "Starred" : "Star"}
        <Badge variant="secondary">{initialStars}</Badge>
      </Button>
    </form>
  );
}
