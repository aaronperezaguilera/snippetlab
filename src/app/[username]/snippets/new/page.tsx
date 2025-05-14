import { SnippetForm } from "@/components/snippet-form";

export default async function NewSnippet() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl">
      <h1 className="text-2xl font-bold mb-8">Create a new snippet</h1>
      <SnippetForm type="create" />
    </main>
  );
}
