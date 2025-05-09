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
import { Language, LANGUAGE_ICON } from "@/config";
import { createSnippet } from "@/app/[username]/snippets/new/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TagsInput } from "./tags-input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Bookmark, Lock } from "lucide-react";

export function SnippetForm() {
  const [language, setLanguage] = useState<Language>(Language.TYPESCRIPT);
  const [value, setValue] = React.useState<string | undefined>(
    "// Some comment"
  );
  const [tags, setTags] = useState<string[]>([]);

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

  const createSnippetWithCode = createSnippet.bind(null, value, tags);

  return (
    <form
      className="flex flex-col items-start w-full gap-4"
      action={createSnippetWithCode}
    >
      <Label>Title:</Label>
      <Input type="text" placeholder="Snippet Title" name="title" />
      <Label>Language:</Label>
      <Select
        value={language}
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
      <Label>Code:</Label>
      <CodeEditor language={language} onChange={setValue} />
      <Label>Tags:</Label>
      <TagsInput value={tags} onValueChange={setTags} placeholder="Add a tag" />
      <Label>Summary:</Label>
      <Textarea
        className="resize-none max-h-[500px]"
        ref={textareaRef}
        placeholder="Write a summary of the snippet"
        name="summary"
      />
      <RadioGroup className="gap-6" name="visibility" defaultValue="public">
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
      <Button type="submit" className=" self-end">
        Create Snippet
      </Button>
    </form>
  );
}
