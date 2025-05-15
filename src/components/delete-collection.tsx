"use client";
import { Button } from "./ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { deleteCollection } from "@/app/[username]/collections/[slug]/edit/actions";

export function DeleteCollection({ id }: { id: number | undefined }) {
  if (!id) {
    return null;
  }

  const deleteCollectionWithId = deleteCollection.bind(null, id);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-destructive font-normal hover:bg-destructive/10 hover:text-destructive"
        >
          Delete Collection
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            collection and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteCollectionWithId}>
            <AlertDialogAction asChild>
              <SubmitButton />
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      className="text-white"
      disabled={pending}
    >
      {pending && <Loader2 className="animate-spin" />} Delete
    </Button>
  );
}
