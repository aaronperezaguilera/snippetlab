import { SnippetForm } from "@/components/snippet-form";

export default function NewSnippet() {
  return (
    <main className="container mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-8">Create a new snippet</h1>
      <SnippetForm />
    </main>
  );
}
