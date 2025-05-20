import { CollectionForm } from "@/components/collection-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new collection - SnippetLab",
  description: "Create a new collection",
};

export default async function NewCollectionPage() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen">
      <h1 className="text-2xl font-semibold mb-8">Create a new collection</h1>
      <CollectionForm type="create" />
    </main>
  );
}
