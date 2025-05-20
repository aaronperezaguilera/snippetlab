import { db } from "@/db/drizzle";
import { snippets, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * Route handler for fetching a snippet by username and slug.
 * Returns the raw code as text/plain and suggests filename for download.
 */
export async function GET(
  request: Request,
  { params }: { params: { username: string; slug: string } }
) {
  const { username, slug } = await params;

  // 1) Buscar usuario
  const userRecord = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .then((results) => results[0]);

  if (!userRecord) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  // 2) Buscar snippet con código y nombre de archivo
  const [snippetRecord] = await db
    .select({
      code: snippets.code,
      filename: snippets.filename,
      visibility: snippets.visibility,
    })
    .from(snippets)
    .where(and(eq(snippets.userId, userRecord.id), eq(snippets.slug, slug)));

  if (!snippetRecord || snippetRecord.visibility !== "public") {
    return NextResponse.json(
      { error: "Snippet no encontrado" },
      { status: 404 }
    );
  }

  // 3) Devolver el código en texto plano, forzando descarga con filename
  const headers = new Headers();
  headers.set("Content-Type", "text/plain; charset=utf-8");

  if (snippetRecord.filename) {
    headers.set(
      "Content-Disposition",
      `attachment; filename="${snippetRecord.filename}"`
    );
  }

  return new NextResponse(snippetRecord.code, {
    status: 200,
    headers,
  });
}
