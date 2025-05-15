import { CodeReader } from "@/components/code-reader";
import { LANGUAGE_ICON } from "@/config";
import { db } from "@/db/drizzle";
import {
  snippets,
  likes,
  users,
  collections,
  collectionSnippets,
  snippetVersions,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, GitFork } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ShareButton } from "@/components/share";
import { PinButton } from "@/components/pin-button";
import { StarButton } from "@/components/star-button";
import { SnippetNav } from "@/components/snippet-nav";
import { ForkButton } from "@/components/fork-button";
import { SaveButton } from "@/components/save-button";
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
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  const starredSnippets = await db
    .select()
    .from(likes)
    .where(
      and(
        eq(likes.snippetId, snippet.id),
        eq(likes.userId, authenticatedUser?.id || "")
      )
    );

  if (snippet.visibility === "private" && authenticatedUser?.id !== author.id) {
    return (
      <div className="container mx-auto mt-16">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
      </div>
    );
  }

  const forkedFrom = snippet.forkedFrom
    ? await db
        .select()
        .from(snippets)
        .leftJoin(users, eq(users.id, snippets.userId))
        .where(eq(snippets.id, snippet.forkedFrom))
        .then((result) => result)
    : null;

  const collectionsList = await db
    .select({
      collections,
      hasSnippet: sql<boolean>`
      EXISTS (
        SELECT 1
        FROM ${collectionSnippets}
        WHERE ${collectionSnippets.collectionId} = ${collections.id}
          AND ${collectionSnippets.snippetId} = ${snippet.id}
      )
    `,
    })
    .from(collections)
    .where(eq(collections.userId, authenticatedUser?.id || ""));

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
    <section className="flex flex-col gap-4 px-16">
      <SnippetNav
        active="versions"
        username={username}
        snippet={snippet.slug}
      />
      <header className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            <Badge variant="secondary" className="border border-neutral-700">
              {snippet.visibility.slice(0, 1).toUpperCase() +
                snippet.visibility.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            {author.id === authenticatedUser?.id && (
              <PinButton id={snippet.id} initialPinned={snippet.pinned} />
            )}

            {author.id !== authenticatedUser?.id && (
              <ForkButton id={snippet.id} />
            )}

            <SaveButton
              snippetId={snippet.id}
              userId={authenticatedUser?.id}
              collections={collectionsList}
            />

            {snippet.visibility === "public" && (
              <>
                <ShareButton />
                <StarButton
                  id={snippet.id}
                  initialStarred={starredSnippets.length > 0}
                  initiallikes={snippet.likesCount}
                />
              </>
            )}

            {author.id === authenticatedUser?.id && (
              <Button asChild>
                <Link href={`/${username}/snippets/${snippet.slug}/edit`}>
                  <Edit /> Edit
                </Link>
              </Button>
            )}
          </div>
        </div>
        {snippet.forkedFrom && forkedFrom && (
          <div className="flex gap-1 items-center text-sm text-muted-foreground">
            <GitFork size={16} />
            Forked from
            <Link
              href={`/${forkedFrom[0].users?.username}/snippets/${forkedFrom[0].snippets.slug}`}
              className="hover:underline"
            >
              {forkedFrom[0].snippets.title}
            </Link>
          </div>
        )}
        <div className="flex gap-2 items-center text-sm text-muted-foreground">
          {LANGUAGE_ICON[snippet.language]}
          {snippet.language.slice(0, 1).toUpperCase() +
            snippet.language.slice(1)}
        </div>
      </header>
      <CodeReader
        filename={snippet.filename}
        language={snippet.language}
        code={snippet.code}
      />
      {stepsReversed.map(({ original, modified, key, label, id }) => (
        <div key={key}>
          <h3 className="text-lg font-medium mb-2">{label}</h3>
          <div className="px-4 bg-[#05121f] rounded-t-lg py-2 border-b border-b-primary/10">
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
