import { QuestionCard } from "../question-card";

export function ForumCard() {
  return (
    <article className="border col-span-12 grid grid-cols-2 gap-8 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Q&A Forum</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Ask questions directly in any snippet and get answers from the
          community. Embed code in your questions and solutions to discuss real
          programming challenges.
        </p>
      </div>
      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col gap-4 relative">
        <QuestionCard
          question={{
            id: 1,
            title: "How do I use the Monaco editor with React?",
            content:
              "I'm trying to integrate Monaco editor into my React project. What is the recommended way to set it up and handle syntax highlighting?",
            createdAt: new Date(),
            userId: "demo-author",
            snippetId: 1,
          }}
          author={{
            id: "demo-author",
            username: "janedoe",
            first_name: "Jane",
            last_name: "Doe",
            image_url: "/jane.webp",
            bio: "Demo user for snippetforge",
            website: "https://example.com",
            github: "janedoe",
            x: "@janedoe",
            createdAt: new Date(),
            updatedAt: null,
          }}
          showAuthor
          showUsername
        />

        <QuestionCard
          question={{
            id: 42,
            title: "What's the best way to debounce a function in JavaScript?",
            content:
              "I need to limit how often a heavy computation function runs when responding to rapid events (like window resizing). What’s a clean way to implement debounce in plain JavaScript or using lodash?",
            createdAt: new Date("2025-05-18T10:30:00Z"),
            userId: "john-doe",
            snippetId: 2,
          }}
          author={{
            id: "john-doe",
            username: "johndoe",
            first_name: "John",
            last_name: "Doe",
            image_url: "/john.webp",
            bio: "Frontend engineer and open­source enthusiast",
            website: "https://johndoe.dev",
            github: "john-doe",
            x: "@john_doe",
            createdAt: new Date("2024-11-01T08:00:00Z"),
            updatedAt: null,
          }}
          showAuthor
          showUsername
        />

        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full"></div>
      </div>
    </article>
  );
}
