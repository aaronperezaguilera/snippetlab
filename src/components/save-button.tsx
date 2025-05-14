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
import { updateSnippetCollection } from "@/app/[username]/snippets/actions";
import { collections } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useState } from "react";
import { useFormStatus } from "react-dom";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    await updateSnippetCollection(snippetId, formData);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookMarked /> Add to collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
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
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-24">
      {pending && <Loader2 className="animate-spin" />} Save
    </Button>
  );
}
