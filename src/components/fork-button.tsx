"use client";

import { GitFork, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { forkSnippet } from "@/app/[username]/snippets/actions";

export function ForkButton({ id }: { id: number }) {
  const { pending } = useFormStatus();

  const formAction = forkSnippet.bind(null, id);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="secondary" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <GitFork />} Fork
    </Button>
  );
}
