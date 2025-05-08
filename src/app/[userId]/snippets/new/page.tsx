import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@/components/editor";
import { createSnippet } from "./actions";

export default function NewSnippet() {
  return (
    <main className="container mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-8">Create a new snippet</h1>
      <form
        className="flex flex-col items-start w-full gap-4"
        action={createSnippet}
      >
        <Input type="text" placeholder="Snippet Title" name="title" />
        <Editor />
        <Button type="submit" className=" self-end">
          Create Snippet
        </Button>
      </form>
    </main>
  );
}
