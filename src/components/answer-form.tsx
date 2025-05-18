"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CodeEditor } from "./code-editor";
import { InferSelectModel } from "drizzle-orm";
import { snippets } from "@/db/schema";
import { createAnswer } from "@/app/forum/[id]/actions";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language, LANGUAGE_ICON } from "@/config";
import { Label } from "./ui/label";
import { toast } from "sonner";

type Snippet = InferSelectModel<typeof snippets>;

export function AnswerForm({
  snippet,
  questionId,
}: {
  snippet?: Snippet;
  questionId: number;
}) {
  const [addAnswer, setAddAnswer] = useState(false);
  const [addCode, setAddCode] = useState(false);
  const [value, setValue] = useState<string | undefined>(snippet?.code || "");
  const [language, setLanguage] = useState<Language>(
    (snippet?.language as Language) || Language.TYPESCRIPT
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await createAnswer(
      questionId,
      addCode ? value : undefined,
      language,
      formData
    );
    setAddAnswer(false);
    setAddCode(false);
    setValue(snippet?.code || "");
    toast.success("Answer submitted successfully");
  };

  return (
    <div>
      {addAnswer && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl">Your answer</h2>
          <Textarea className="min-h-48" name="content" required />
          {addCode && (
            <>
              <Label>Language:</Label>
              <Select
                defaultValue={snippet?.language || language}
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
              <CodeEditor
                language={snippet?.language}
                code={snippet?.code}
                onChange={setValue}
              />
            </>
          )}
          <div className="flex gap-2 justify-between">
            {!addCode && (
              <Button
                variant="secondary"
                onClick={() => {
                  setAddCode(true);
                }}
                type="button"
              >
                Add code
              </Button>
            )}
            {addCode && (
              <Button
                variant="secondary"
                onClick={() => {
                  setAddCode(false);
                }}
                type="button"
              >
                Discard code
              </Button>
            )}
            <AnswerButton />
          </div>
        </form>
      )}
      <div className="flex justify-end">
        <Button
          variant={addAnswer ? "destructive" : "default"}
          className={addAnswer ? "mt-4" : ""}
          onClick={() => {
            setAddAnswer((prev) => !prev);
          }}
          type="button"
        >
          {addAnswer ? "Cancel" : "Answer this question"}
        </Button>
      </div>
    </div>
  );
}

function AnswerButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="animate-spin" />}
      {pending ? "Submitting..." : "Submit your answer"}
    </Button>
  );
}
