"use client";

import { useEffect, useRef, useState } from "react";
import { Link, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { updateProfile } from "@/app/[username]/(layout)/actions";
import { useFormStatus } from "react-dom";
import { users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Icons } from "./ui/icons";
import { useUser } from "@clerk/nextjs";

type User = InferSelectModel<typeof users>;

export function ProfileDetails({ profile }: { profile: User }) {
  const [editing, setEditing] = useState(false);

  const user = useUser();

  return (
    <div className="flex justify-between w-full">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-muted-foreground">@{profile.username}</p>
        </div>
        <p>{profile.bio}</p>
      </div>

      {!editing && (
        <>
          <div className="flex flex-col gap-2">
            {profile.website && (
              <a
                href={`${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
              >
                <Link className="size-4" /> Website
              </a>
            )}
            {profile.github && (
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
              >
                <Icons.gitHub className="size-4" /> GitHub
              </a>
            )}
            {profile.x && (
              <a
                href={`https://x.com/${profile.x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-muted-foreground hover:underline w-fit"
              >
                <Icons.x className="size-4" /> Twitter
              </a>
            )}
            {user.user?.id === profile.id && (
              <Button
                className="w-fit"
                variant="secondary"
                onClick={() => setEditing(true)}
              >
                Edit profile
              </Button>
            )}
          </div>
        </>
      )}

      {editing && (
        <form action={updateProfile} className="flex gap-8">
          <div className="space-y-2 w-80">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              maxLength={160}
              placeholder="Add a bio"
              name="bio"
              className="max-h-24 h-full"
              defaultValue={profile.bio || ""}
            />
          </div>

          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-2 items-center">
              <Link className="size-4" />
              <Input
                type="url"
                placeholder="Website URL"
                className="w-full"
                name="website"
                defaultValue={profile.website || ""}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Icons.gitHub className="size-4" />
              <Input
                type="text"
                placeholder="GitHub Username"
                className="w-full"
                name="github"
                defaultValue={profile.github || ""}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Icons.x className="size-4" />
              <Input
                type="text"
                placeholder="X Username"
                className="w-full"
                name="x"
                defaultValue={profile.x || ""}
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
          </div>
        </form>
      )}
    </div>
  );
}

function SubmitButton({ onSuccess }: { onSuccess: () => void }) {
  const { pending } = useFormStatus();

  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
    }

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
