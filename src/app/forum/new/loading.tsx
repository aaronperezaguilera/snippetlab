import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto mt-16 min-h-screen">
      <h1 className="text-2xl font-bold">New Question</h1>
      <form className="flex flex-col gap-4 mt-4">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          maxLength={200}
          required
          disabled
        />
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          id="content"
          required
          className="min-h-48"
          disabled
        ></Textarea>
        <Select name="snippet" disabled>
          <SelectTrigger className="w-[300px]">
            Select your snippet
          </SelectTrigger>
        </Select>

        <Button disabled className="w-fit">
          <Send /> Send your question
        </Button>
      </form>
    </main>
  );
}
