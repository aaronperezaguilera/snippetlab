import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      await db.insert(users).values({
        id: evt.data.id,
        username: evt.data.username ?? "username",
        first_name: evt.data.first_name ?? null,
        last_name: evt.data.last_name ?? null,
        image_url: evt.data.image_url ?? null,
        createdAt: new Date(evt.data.created_at),
        updatedAt: new Date(evt.data.updated_at),
      });
    }
    if (evt.type === "user.updated") {
      await db
        .update(users)
        .set({
          username: evt.data.username ?? "username",
          first_name: evt.data.first_name ?? null,
          last_name: evt.data.last_name ?? null,
          image_url: evt.data.image_url ?? null,
          updatedAt: new Date(evt.data.updated_at),
        })
        .where(eq(users.id, evt.data.id));
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
