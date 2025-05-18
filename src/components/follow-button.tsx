"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { updateFollow } from "@/app/[username]/(profileLayout)/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
      if (nextState) {
        toast.success("You are now following this user");
      } else {
        toast.success("You have unfollowed this user");
      }
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
