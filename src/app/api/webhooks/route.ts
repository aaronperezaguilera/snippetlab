import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
      revalidatePath(`/${evt.data.username}`);
    }
    if (evt.type === "user.updated") {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, evt.data.id));

      await db
        .update(users)
        .set({
          username: evt.data.username ?? user.username,
          first_name: evt.data.first_name ?? user.first_name,
          last_name: evt.data.last_name ?? user.last_name,
          image_url: evt.data.image_url ?? user.image_url,
          updatedAt: new Date(evt.data.updated_at),
        })
        .where(eq(users.id, evt.data.id));
      revalidatePath(`/${evt.data.username}`);
    }
    if (evt.type === "user.deleted") {
      if (evt.data.id) {
        await db.delete(users).where(eq(users.id, evt.data.id));
      } else {
        console.error("User ID not provided for user.deleted event");
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
