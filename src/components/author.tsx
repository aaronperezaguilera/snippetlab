import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { type InferSelectModel } from "drizzle-orm";
import { users } from "@/db/schema";

type User = InferSelectModel<typeof users>;

export function Author({
  author,
  clasName,
}: {
  author: User;
  clasName?: string;
}) {
  return (
    <div className="flex gap-3 items-center">
      <Button
        variant="ghost"
        asChild
        className={`pr-4 pl-2 py-2 h-full -translate-x-2 w-fit z-50 ${clasName}`}
      >
        <Link href={`/${author.username}`} className="flex gap-3 items-center">
          {author.image_url && (
            <Image
              src={author.image_url}
              width={1000}
              height={1000}
              alt="Profile"
              className="w-12 h-12 object-cover"
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
    </div>
  );
}
