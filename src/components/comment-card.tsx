import { comments, users } from "@/db/schema";
import { RelativeTime } from "./relative-time";
import { type InferSelectModel, eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { Author } from "./author";

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
    <div className="p-4 border-b flex flex-col relative gap-4">
      <Author author={author} />
      <p className="mt-1">{comment.content}</p>
      <span className="text-muted-foreground text-sm">
        Commented <RelativeTime datetime={comment.createdAt}></RelativeTime>
      </span>
    </div>
  );
}
