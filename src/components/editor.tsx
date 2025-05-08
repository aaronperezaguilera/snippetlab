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

export function Editor() {
  const [language, setLanguage] = useState<Language>(Language.TYPESCRIPT);

  return (
    <>
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

      <CodeEditor language={language} />
    </>
  );
}
