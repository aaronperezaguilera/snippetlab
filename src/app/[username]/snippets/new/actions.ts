"use server";

import { db } from "@/db/drizzle";
import { snippets } from "@/db/schema";
import { formatSlug } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { upsertUser } from "@/db";
import { generateObject } from "ai";
import { z } from "zod";
import { google } from "@ai-sdk/google";
import { Language } from "@/config";

export async function createSnippet(
  value: string | undefined,
  tags: string[],
  formData: FormData
) {
  const { title, filename, language, visibility, summary, examples } = {
    title: formData.get("title"),
    filename: formData.get("filename"),
    language: formData.get("language"),
    visibility: formData.get("visibility"),
    summary: formData.get("summary"),
    examples: formData.get("examples"),
  };

  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  const baseSlug = formatSlug(title as string);

  let slug = baseSlug;
  let attempt = 0;

  while (true) {
    const [{ count: existingCount }] = await db
      .select({ count: count() })
      .from(snippets)
      .where(eq(snippets.slug, slug));

    if (Number(existingCount) === 0) {
      break;
    }

    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  await db.insert(snippets).values({
    title: title as string,
    filename: filename as string,
    slug,
    language: language as string,
    code: value as string,
    tags: tags as string[],
    summary: summary as string,
    examples: examples ? JSON.parse(examples as string) : [],
    visibility: visibility as "public" | "private",
    userId: userId as string,
  });

  revalidatePath(`/${username}/snippets`);
  revalidatePath(`/explore`);
  revalidatePath(`/`);
  redirect(`/${username}/snippets/${slug}?created=true`);
}

export async function createAISnippet(formData: FormData) {
  const prompt = formData.get("prompt");

  const user = await currentUser();

  upsertUser(user);

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const username = user.username;

  const { object } = await generateObject({
    model: google("gemini-2.0-flash"),
    schema: z.object({
      title: z.string(),
      filename: z.string(),
      language: z.nativeEnum(Language),
      code: z.string(),
      tags: z.array(z.string()),
      summary: z.string(),
    }),
    prompt:
      "Generate a snippet of code following the user indications: " + prompt,
  });

  const baseSlug = formatSlug(object.title);

  let slug = baseSlug;
  let attempt = 0;

  while (true) {
    const [{ count: existingCount }] = await db
      .select({ count: count() })
      .from(snippets)
      .where(eq(snippets.slug, slug));

    if (Number(existingCount) === 0) {
      break;
    }

    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  await db.insert(snippets).values({
    title: object.title,
    filename: object.filename,
    slug,
    language: object.language,
    code: object.code,
    tags: object.tags,
    summary: object.summary,
    examples: [],
    visibility: "public",
    userId: userId as string,
  });

  revalidatePath(`/${username}/snippets`);
  revalidatePath(`/explore`);
  revalidatePath(`/`);
  redirect(`/${username}/snippets/${slug}?created=true`);
}
