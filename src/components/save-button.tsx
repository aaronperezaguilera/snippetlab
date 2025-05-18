"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookMarked, Loader2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { updateSnippetCollection } from "@/app/[username]/(profileLayout)/snippets/actions";
import { collections } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type Collection = InferSelectModel<typeof collections>;

export type CollectionWithSnippetsItem = {
  collections: Collection;
  hasSnippet: boolean;
};

export function SaveButton({
  snippetId,
  userId,
  collections,
}: {
  snippetId: number;
  userId?: string;
  collections: CollectionWithSnippetsItem[];
}) {
  const [open, setOpen] = useState(false);

  if (!userId) {
    return null;
  }

  const formAction = updateSnippetCollection.bind(null, snippetId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <BookMarked /> Add to collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Add to collection</DialogTitle>
            <DialogDescription>
              Select the collections you want to add this snippet to.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            {collections.length > 0 ? (
              collections.map(({ collections, hasSnippet }) => (
                <div
                  key={collections.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={collections.slug}
                    name="collectionIds"
                    value={collections.id}
                    defaultChecked={hasSnippet}
                  />
                  <label
                    htmlFor={collections.slug}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {collections.title}
                  </label>
                </div>
              ))
            ) : (
              <div className="text-sm font-medium leading-none">
                No collections found
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogTrigger>
            <SubmitButton
              onSuccess={() => {
                setOpen(false);
                toast.success("Collection updated successfully!");
              }}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton({ onSuccess }: { onSuccess: () => void }) {
  const { pending } = useFormStatus();

  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
    }

    if (wasPending.current && !pending) {
      wasPending.current = false;
      onSuccess();
    }
  }, [pending, onSuccess]);

  return (
    <Button disabled={pending} className="w-24">
      {pending && <Loader2 className="animate-spin" />} Save
    </Button>
  );
}
