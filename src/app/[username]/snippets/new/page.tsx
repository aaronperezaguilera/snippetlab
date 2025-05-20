import { GenerateAISnippet } from "@/components/generate-ai-snippet";
import { SnippetForm } from "@/components/snippet-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new snippet - SnippetLab",
  description: "Create a new snippet",
};

export default async function NewSnippet() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen pb-8">
      <h1 className="text-2xl font-semibold mb-8">Create a new snippet</h1>
      <SnippetForm type="create" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Or generate with AI</h2>
        <GenerateAISnippet />
      </div>
    </main>
  );
}
