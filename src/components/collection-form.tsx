"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Bookmark, Loader2, Lock } from "lucide-react";
import { useFormStatus } from "react-dom";
import { updateCollection } from "@/app/[username]/collections/[slug]/edit/actions";
import { createCollection } from "@/app/[username]/collections/new/actions";
import { DeleteCollection } from "./delete-collection";

export function CollectionForm({
  id,
  title,
  description,
  visibility,
  type,
}: {
  id?: number;
  title?: string;
  description?: string | null;
  visibility?: "public" | "private";
  type: "create" | "edit";
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    textarea.addEventListener("input", handleInput);

    // Llamar una vez por si ya hay texto
    handleInput();

    // Cleanup
    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  const updateCollectionWithID = (formData: FormData) => {
    return updateCollection(id || 0, formData);
  };

  return (
    <>
      <form
        className="flex flex-col items-start w-full gap-4"
        id="collection-form"
      >
        <Label>Title:</Label>
        <Input
          type="text"
          placeholder="Collection Title"
          defaultValue={title}
          name="title"
          required
        />

        <Label>Description:</Label>
        <Textarea
          className="resize-none max-h-[500px]"
          ref={textareaRef}
          placeholder="Write a desription of your collection"
          name="description"
          defaultValue={description || ""}
          maxLength={300}
        />

        <RadioGroup
          className="gap-6"
          name="visibility"
          defaultValue={visibility || "public"}
        >
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public" className="flex gap-4 items-center">
              <Bookmark />
              <div className="flex flex-col gap-2">
                <span>Public</span>
                <span className="font-normal text-muted-foreground">
                  Anyone on the internet can see this collection.
                </span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private" className="flex gap-4 items-center">
              <Lock />
              <div className="flex flex-col gap-2">
                <span>Private</span>
                <span className="font-normal text-muted-foreground">
                  You are the only one who can see this collection.
                </span>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex gap-4 justify-end w-full mt-4">
          {type === "edit" && <DeleteCollection id={id} />}
          <SubmitButton
            type={type}
            formAction={
              type === "create" ? createCollection : updateCollectionWithID
            }
          />
        </div>
      </form>
    </>
  );
}

function SubmitButton({
  type,
  formAction,
}: {
  type: "create" | "edit";
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      form="collection-form"
      disabled={pending}
      formAction={formAction}
    >
      {pending && <Loader2 className="animate-spin" />}
      {type === "create" ? "Create Collection" : "Update Collection"}
    </Button>
  );
}
