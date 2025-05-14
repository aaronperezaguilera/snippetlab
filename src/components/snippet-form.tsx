"use client";

import React, { useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXAMPLE_SITE_ICONS, Language, LANGUAGE_ICON } from "@/config";
import { createSnippet } from "@/app/[username]/snippets/new/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TagsInput } from "./tags-input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Bookmark, Loader2, Lock } from "lucide-react";
import { updateSnippet } from "@/app/[username]/snippets/[slug]/edit/actions";
import { DeleteSnippet } from "./delete-snippet";
import { useFormStatus } from "react-dom";
import { exampleSite } from "@/db/schema";

export type Examples = {
  website: keyof typeof exampleSite.enumValues;
  url: string;
}[];

export function SnippetForm({
  id,
  title,
  defaultLanguage,
  code,
  defaultTags,
  summary,
  defaultExamples,
  visibility,
  type,
}: {
  id?: number;
  title?: string;
  defaultLanguage?: string;
  code?: string;
  defaultTags?: string[];
  summary?: string;
  defaultExamples?: Examples;
  visibility?: "public" | "private";
  type: "create" | "edit";
}) {
  const [examples, setExamples] = useState<
    { website: keyof typeof exampleSite.enumValues; url: string }[]
  >(defaultExamples || []);
  const [language, setLanguage] = useState<Language>(Language.TYPESCRIPT);
  const [value, setValue] = React.useState<string | undefined>(
    code || "// Some comment"
  );
  const [tags, setTags] = useState<string[]>(defaultTags || []);

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

  const addExample = () => {
    setExamples((prev) => [
      ...prev,
      { website: "codilink" as keyof typeof exampleSite.enumValues, url: "" },
    ]);
  };

  const updateExample = (
    idx: number,
    field: "website" | "url",
    value: string
  ) => {
    setExamples((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const removeExample = (idx: number) => {
    setExamples((prev) => prev.filter((_, i) => i !== idx));
  };

  const createSnippetWithCode = createSnippet.bind(null, value, tags);
  const updateSnippetWithCode = updateSnippet.bind(null, value, tags, id || 0);

  return (
    <>
      <form
        className="flex flex-col items-start w-full gap-4"
        id="snippet-form"
      >
        <Label>Title:</Label>
        <Input
          type="text"
          placeholder="Snippet Title"
          defaultValue={title}
          name="title"
          required
        />
        <Label>Language:</Label>
        <Select
          defaultValue={defaultLanguage || language}
          onValueChange={(val) => setLanguage(val as Language)}
          name="language"
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Language).map((lang) => (
              <SelectItem key={lang} value={lang}>
                {LANGUAGE_ICON[lang]}
                {lang.slice(0, 1).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label>File name:</Label>
        <Input
          type="text"
          placeholder="filename.ts"
          defaultValue={title}
          name="filename"
          required
        />
        <Label>Code:</Label>
        <CodeEditor code={value} language={language} onChange={setValue} />
        <Label>Tags:</Label>
        <TagsInput
          value={tags}
          onValueChange={setTags}
          placeholder="Add a tag"
        />
        <Label>Summary:</Label>
        <Textarea
          className="resize-none max-h-[500px]"
          ref={textareaRef}
          placeholder="Write a summary of the snippet"
          name="summary"
          defaultValue={summary}
        />
        <Label>Examples:</Label>
        <div className="flex flex-col gap-2 w-full">
          {examples.map((ex, i) => (
            <div key={i} className="flex gap-2 items-end">
              <Select
                name={`example-site-${i}`}
                value={ex.website.toString()}
                onValueChange={(val) => updateExample(i, "website", val as any)}
                key={i}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sitio" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(exampleSite.enumValues).map((site) => (
                    <SelectItem key={site} value={site}>
                      {EXAMPLE_SITE_ICONS[site]}{" "}
                      {site.slice(0, 1).toUpperCase() + site.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                name={`example-url-${i}`}
                type="url"
                placeholder="https://..."
                value={ex.url}
                onChange={(e) => updateExample(i, "url", e.currentTarget.value)}
                className="flex-1"
                required
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeExample(i)}
              >
                ×
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={addExample}
            className="mt-2"
          >
            + Add example
          </Button>
        </div>

        <input type="hidden" name="examples" value={JSON.stringify(examples)} />

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
                  Anyone on the internet can see this repository. You choose who
                  can commit.
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
                  You choose who can see and commit to this repository.
                </span>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex gap-4 justify-end w-full mt-4">
          {type === "edit" && <DeleteSnippet id={id} />}
          <SubmitButton
            type={type}
            formAction={
              type === "create" ? createSnippetWithCode : updateSnippetWithCode
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
      form="snippet-form"
      disabled={pending}
      formAction={formAction}
    >
      {pending && <Loader2 className="animate-spin" />}
      {type === "create" ? "Create Snippet" : "Update Snippet"}
    </Button>
  );
}
