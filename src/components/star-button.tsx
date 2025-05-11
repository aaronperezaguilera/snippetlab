"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { updatePin, updateStar } from "@/app/[username]/snippets/actions";
import { Pin, Star } from "lucide-react";
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
  // 1) Estado optimista: prev → next
  const [isStarred, addOptimisticStar] = useOptimistic(
    initialStarred,
    (prev, next) => next
  );

  // 2) Transition para agrupar la actualización de estado + server action
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 3) Mueve tanto el optimismo como la llamada al server action
    startTransition(() => {
      const nextState = !isStarred;
      addOptimisticStar(nextState); // actualiza UI inmediatamente
      updateStar(id, nextState); // server action en background
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
