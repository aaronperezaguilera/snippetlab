import { comments, users } from "@/db/schema";
import { RelativeTime } from "./relative-time";
import { type InferSelectModel, eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

type Comment = InferSelectModel<typeof comments>;

export default async function CommentCard({ comment }: { comment: Comment }) {
  if (!comment) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, comment.userId));

  const author = user[0];

  return (
    <Card className="border-b py-3">
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-3 items-center justify-between">
          <Button
            variant="ghost"
            asChild
            className="pr-4 pl-2 py-2 h-full -translate-x-2"
          >
            <Link
              href={`/${author.username}`}
              className="flex gap-3 items-center"
            >
              {author.image_url && (
                <Image
                  src={author.image_url}
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-col">
                <span>
                  {author.first_name} {author.last_name}
                </span>
                <span>@{author.username}</span>
              </div>
            </Link>
          </Button>
          <span className="text-muted-foreground">
            <RelativeTime datetime={comment.createdAt}></RelativeTime>
          </span>
        </div>
        <p className="mt-1">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
