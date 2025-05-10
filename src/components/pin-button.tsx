"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { updatePin } from "@/app/[username]/snippets/actions";
import { Pin } from "lucide-react";

export function PinButton({
  id,
  initialPinned,
}: {
  id: number;
  initialPinned: boolean;
}) {
  // 1) Estado optimista: prev → next
  const [isPinned, addOptimisticPin] = useOptimistic(
    initialPinned,
    (prev, next) => next
  );

  // 2) Transition para agrupar la actualización de estado + server action
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 3) Mueve tanto el optimismo como la llamada al server action
    startTransition(() => {
      const nextState = !isPinned;
      addOptimisticPin(nextState); // actualiza UI inmediatamente
      updatePin(id, nextState); // server action en background
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
