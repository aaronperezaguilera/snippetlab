import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, Lock } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Edit your collection</h1>
      <form
        className="flex flex-col items-start w-full gap-4"
        id="collection-form"
      >
        <Label>Title:</Label>
        <Input
          type="text"
          placeholder="Collection Title"
          name="title"
          required
          disabled
        />

        <Label>Description:</Label>
        <Textarea
          className="resize-none max-h-[500px]"
          placeholder="Write a desription of your collection"
          name="description"
          maxLength={300}
          disabled
        />

        <RadioGroup
          className="gap-6"
          name="visibility"
          defaultValue={"public"}
          disabled
        >
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public" className="flex gap-4 items-center">
              <Bookmark />
              <div className="flex flex-col gap-2">
                <span>Public</span>
                <span className="font-normal text-muted-foreground">
                  Anyone on the internet can see this collection.
                </span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private" className="flex gap-4 items-center">
              <Lock />
              <div className="flex flex-col gap-2">
                <span>Private</span>
                <span className="font-normal text-muted-foreground">
                  You are the only one who can see this collection.
                </span>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex gap-4 justify-end w-full mt-4">
          <Button type="submit" form="collection-form" disabled>
            Create Collection
          </Button>
        </div>
      </form>
    </main>
  );
}
