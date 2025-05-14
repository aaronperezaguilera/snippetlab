"use client";

import { useEffect, useRef, useState } from "react";
import { Link, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { updateProfile } from "@/app/[username]/actions";
import { useFormStatus } from "react-dom";
import { users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Icons } from "./ui/icons";

type User = InferSelectModel<typeof users>;

export function ProfileDetails({ user }: { user: User }) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing && (
        <>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => setEditing(true)}
          >
            Edit profile
          </Button>
          <div className="flex flex-col gap-2">
            {user.bio && (
              <>
                <span className="font-medium text-sm">Bio</span>
                <p>{user.bio}</p>
              </>
            )}
            {user.website && (
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
              >
                <Link className="size-4" /> Website
              </a>
            )}
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
              >
                <Icons.gitHub className="size-4" /> GitHub
              </a>
            )}
            {user.x && (
              <a
                href={`https://x.com/${user.x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
              >
                <Icons.x className="size-4" /> Twitter
              </a>
            )}
          </div>
        </>
      )}

      {editing && (
        <form action={updateProfile} className="flex flex-col gap-4">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            maxLength={160}
            placeholder="Add a bio"
            name="bio"
            defaultValue={user.bio || ""}
          />

          <div className="flex gap-2 items-center">
            <Link className="size-4" />
            <Input
              type="url"
              placeholder="Website URL"
              className="w-full"
              name="website"
              defaultValue={user.website || ""}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Icons.gitHub className="size-4" />
            <Input
              type="text"
              placeholder="GitHub Username"
              className="w-full"
              name="github"
              defaultValue={user.github || ""}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Icons.x className="size-4" />
            <Input
              type="text"
              placeholder="X Username"
              className="w-full"
              name="x"
              defaultValue={user.x || ""}
            />
          </div>

          <div className="flex gap-2 items-center">
            <SubmitButton onSuccess={() => setEditing(false)} />
            <Button
              variant="secondary"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

function SubmitButton({ onSuccess }: { onSuccess: () => void }) {
  const { pending } = useFormStatus();

  // Ref para saber si alguna vez estuvo en pending
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
    }

    // Si antes estaba en pending y ahora ya no, entonces fue un submit real
    if (wasPending.current && !pending) {
      wasPending.current = false;
      onSuccess();
    }
  }, [pending, onSuccess]);

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="animate-spin mr-2" />}
      Save
    </Button>
  );
}
