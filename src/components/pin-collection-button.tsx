"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { Pin } from "lucide-react";
import { updatePin } from "@/app/[username]/(profileLayout)/collections/actions";

export function PinCollectionButton({
  id,
  initialPinned,
}: {
  id: number;
  initialPinned: boolean;
}) {
  const [isPinned, addOptimisticPin] = useOptimistic(
    initialPinned,
    (prev: boolean, next: boolean) => next
  );

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const nextState = !isPinned;
      addOptimisticPin(nextState);
      updatePin(id, nextState);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="secondary" disabled={isPending}>
        <Pin fill={isPinned ? "#fafafa" : undefined} />
        {isPinned ? "Unpin" : "Pin"}
      </Button>
    </form>
  );
}
