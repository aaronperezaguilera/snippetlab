import { CodeReader } from "@/components/code-reader";
import { db } from "@/db/drizzle";
import { snippets, users, snippetVersions } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { DiffReader } from "@/components/diff-reader";
import { RestoreButton } from "@/components/restore-button";

export default async function VersionsPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;

  const authenticatedUser = await currentUser();

  const [author] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  const [snippet] = await db
    .select()
    .from(snippets)
    .where(and(eq(snippets.slug, slug), eq(snippets.userId, author.id)));

  if (!snippet) {
    return (
      <div className="container mx-auto mt-16 ">
        <h1 className="text-2xl font-semibold">Snippet not found</h1>
      </div>
    );
  }

  if (snippet.visibility === "private" && authenticatedUser?.id !== author.id) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-semibold">Snippet not found</h1>
      </div>
    );
  }

  const snippetVersionsList = await db
    .select()
    .from(snippetVersions)
    .where(eq(snippetVersions.snippetId, snippet.id));

  const versions = [...snippetVersionsList].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  // 2) Construir los pasos de diff
  const steps: {
    id?: number;
    original: string;
    modified: string;
    key: string;
    label: string;
  }[] = [];

  // Si hay al menos una versión
  if (versions.length > 0) {
    // a) Diff entre cada par de versiones consecutivas
    for (let i = 0; i < versions.length - 1; i++) {
      steps.push({
        id: versions[i].id,
        original: versions[i].code,
        modified: versions[i + 1].code,
        key: `diff-v${i + 1}-v${i + 2}`,
        label: `Version ${i + 1} ↔ Version ${i + 2}`,
      });
    }

    // b) Finalmente, diff entre la última versión guardada y el código actual
    const lastIdx = versions.length - 1;
    steps.push({
      id: versions[lastIdx].id,
      original: versions[lastIdx].code,
      modified: snippet.code,
      key: `diff-v${lastIdx + 1}-actual`,
      label: `Version ${lastIdx + 1} ↔ Latest`,
    });
  }
  // 3) Invertimos para que lo más reciente (último diff) salga primero
  const stepsReversed = steps.reverse();

  return (
    <section className="flex flex-col gap-4 px-8">
      <CodeReader
        filename={snippet.filename}
        language={snippet.language}
        code={snippet.code}
      />
      {stepsReversed.map(({ original, modified, key, label, id }) => (
        <div key={key}>
          <h3 className="text-lg font-medium mb-2">{label}</h3>
          <div className="px-4 bg-[#28292c] py-2 border rounded-t-sm">
            {snippet.filename}
          </div>
          <div className="relative">
            <RestoreButton
              snippetId={snippet.id}
              versionId={id || 0}
              className="absolute z-50 right-3 top-3"
            />
            <DiffReader
              filename="snippet.ts"
              language="typescript"
              original={original}
              modified={modified}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
