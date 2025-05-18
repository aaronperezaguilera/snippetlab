import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, Lock, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Create a new snippet</h1>
      <form
        className="flex flex-col items-start w-full gap-4"
        id="snippet-form"
      >
        <Label>Title:</Label>
        <Input
          type="text"
          placeholder="Snippet Title"
          name="title"
          required
          disabled
        />
        <Label>Language:</Label>
        <Select name="language" disabled>
          <SelectTrigger className="w-48">Language</SelectTrigger>
        </Select>
        <Label>File name:</Label>
        <Input
          type="text"
          placeholder="filename.ts"
          name="filename"
          required
          disabled
        />
        <Label>Code:</Label>
        <Skeleton className="w-full h-52" />
        <Label>Tags:</Label>
        <Input placeholder="Add a tag" className="h-11" disabled />
        <Label>Summary:</Label>
        <Textarea
          className="resize-none max-h-[500px]"
          placeholder="Write a summary of the snippet"
          name="summary"
          maxLength={600}
          disabled
        />
        <Label>Examples:</Label>
        <div className="flex flex-col gap-2 w-full">
          <Button type="button" variant="secondary" disabled className="mt-2">
            + Add example
          </Button>
        </div>

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
                  Anyone on the internet can see this snippet.
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
                  You are the only one who can see this snippet.
                </span>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex gap-4 justify-end w-full mt-4">
          <Button type="submit" form="snippet-form" disabled>
            Create Snippet
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Or generate with AI</h2>
        <div className="relative">
          <Textarea
            placeholder="Describe your snippet"
            className="resize-none pr-16 max-h-24 h-full"
            maxLength={300}
            name="prompt"
            required
          />
          <Button
            size="icon"
            type="submit"
            disabled
            className="absolute top-3 right-3 hover:bg-gradient-to-br border bg-background text-white hover:from-blue-800/80 hover:to-purple-800/80 transition-colors"
          >
            {" "}
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
