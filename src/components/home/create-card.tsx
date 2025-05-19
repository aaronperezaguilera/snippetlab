import { CodeReader } from "../code-reader";
import { GenerateAISnippet } from "../generate-ai-snippet";

export function CreateCard() {
  return (
    <article className="border col-span-12 grid grid-cols-2 gap-8 rounded-sm overflow-hidden">
      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col justify-center gap-4 relative">
        <h4 className="text-xl font-semibold">Generate your snippet with AI</h4>
        <GenerateAISnippet />
        <div>
          <div className="px-4 bg-[#28292c] py-2 border rounded-t-sm">
            example.js
          </div>
          <CodeReader
            code={`const a = 1;\nconst c = a;\n\nconsole.log(c);`}
            language="javascript"
          />
        </div>
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full z-50"></div>
      </div>
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Create & Share Snippets</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Publish your code snippets in seconds with our fully integrated Monaco
          editor with syntax highlighting. Share each snippet via a unique link,
          get feedback from the community—and even generate brand‑new snippets
          from scratch by simply describing what you need to our built‑in AI
          assistant.
        </p>
      </div>
    </article>
  );
}
