import { CollectionForm } from "@/components/collection-form";

export default function NewCollectionPage() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl">
      <h1 className="text-2xl font-bold mb-8">Create a new collection</h1>
      <CollectionForm type="create" />
    </main>
  );
}
