import { CollectionForm } from "@/components/collection-form";
import { db } from "@/db/drizzle";
import { collections } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit collection - SnippetLab",
  description: "Edit your collection",
};

export default async function NewCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const authenticatedUser = await currentUser();

  const [collection] = await db
    .select()
    .from(collections)
    .where(eq(collections.slug, slug));

  if (!collection || authenticatedUser?.id !== collection.userId) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-semibold">Collection not found</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen">
      <h1 className="text-2xl font-semibold mb-8">Edit your collection</h1>
      <CollectionForm
        id={collection.id}
        title={collection.title}
        description={collection.description}
        visibility={collection.visibility}
        type="edit"
      />
    </main>
  );
}
