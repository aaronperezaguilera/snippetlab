"use client";
import { addComment } from "@/app/[username]/snippets/[slug]/comments/actions";
import { useState, FormEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function CommentForm({ snippetId }: { snippetId: number }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    await addComment(snippetId, content);
    setContent("");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Write a comment..."
        required
      />
      <Button
        type="submit"
        disabled={loading}
        className="mt-2 self-end btn-primary"
      >
        {loading ? "Sending..." : "Comment"}
      </Button>
    </form>
  );
}
