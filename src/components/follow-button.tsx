"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { updateFollow } from "@/app/[username]/(layout)/actions";
import { cn } from "@/lib/utils";

export function FollowButton({
  id,
  initialFollowed,
}: {
  id: string;
  initialFollowed: boolean;
}) {
  const [isFollowed, addOptimisticFollow] = useOptimistic(
    initialFollowed,
    (prev: boolean, next: boolean) => next
  );

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const nextState = !isFollowed;
      addOptimisticFollow(nextState);
      updateFollow(id, nextState);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-64 transition-colors",
          isFollowed &&
            "bg-transparent text-white hover:bg-destructive/80 border"
        )}
      >
        {isFollowed ? "Following" : "Follow"}
      </Button>
    </form>
  );
}
