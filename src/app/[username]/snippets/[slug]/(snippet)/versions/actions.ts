"use server";

import { db } from "@/db/drizzle";
import { snippets, snippetVersions } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function restoreSnippetVersion(
  snippetId: number,
  versionId: number
) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const [current] = await db
    .select()
    .from(snippets)
    .where(eq(snippets.id, snippetId));

  if (!current) throw new Error("Snippet not found");

  const [version] = await db
    .select()
    .from(snippetVersions)
    .where(eq(snippetVersions.id, versionId));

  if (!version) throw new Error("Version not found");

  await db.insert(snippetVersions).values([
    {
      snippetId,
      code: current.code,
    },
  ]);

  await db
    .update(snippets)
    .set({
      code: version.code,
      updatedAt: new Date(),
    })
    .where(eq(snippets.id, snippetId));

  revalidatePath(`/${user.username}/snippets`);
  revalidatePath(`/${user.username}/snippets/${current.slug}`);
  revalidatePath(`/${user.username}/snippets/${current.slug}/versions`);
  redirect(`/${user.username}/snippets/${current.slug}`);
}
