"use client";

import React, { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/config";
import { createSnippet } from "@/app/[userId]/snippets/new/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SnippetForm() {
  const [language, setLanguage] = useState<Language>(Language.TYPESCRIPT);
  const [value, setValue] = React.useState<string | undefined>(
    "// Some comment"
  );

  const createSnippetWithCode = createSnippet.bind(null, value);

  return (
    <form
      className="flex flex-col items-start w-full gap-4"
      action={createSnippetWithCode}
    >
      <Input type="text" placeholder="Snippet Title" name="title" />
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
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CodeEditor language={language} onChange={setValue} />
      <Button type="submit" className=" self-end">
        Create Snippet
      </Button>
    </form>
  );
}
