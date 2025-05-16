"use client";

import { createQuestion } from "@/app/forum/new/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { snippets } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Loader2, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

type Snippet = InferSelectModel<typeof snippets>;

export function QuestionForm({ snippets }: { snippets: Snippet[] }) {
  return (
    <form action={createQuestion} className="flex flex-col gap-4 mt-4">
      <Label htmlFor="title">Title</Label>
      <Input type="text" name="title" id="title" maxLength={200} required />
      <Label htmlFor="content">Content</Label>
      <Textarea
        name="content"
        id="content"
        required
        className="min-h-48"
      ></Textarea>
      <Select name="snippet">
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select your snippet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none" className="text-muted-foreground">
            None
          </SelectItem>
          {snippets.map((snippet) => (
            <SelectItem key={snippet.id} value={String(snippet.id)}>
              {snippet.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-fit">
      {pending ? <Loader2 className="animate-spin" /> : <Send />} Send your
      question
    </Button>
  );
}
