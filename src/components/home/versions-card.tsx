import { DiffReader } from "../diff-reader";

export function VersionsCard() {
  return (
    <article className="border flex flex-col gap-8 col-span-8 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Version History & Restore</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Every time you edit a snippet, we automatically save the previous
          version. Navigate through the change history with visual diffs and
          restore any version instantly with a single click.
        </p>
      </div>
      <div className="pointer-events-none px-8 overflow-hidden flex flex-col gap-4 relative">
        <h4 className="text-lg font-medium mb-2 text-muted-foreground">
          Version 4 ↔ Latest
        </h4>
        <div>
          <div className="px-4 bg-[#28292c] py-2 border rounded-t-sm">
            example.js
          </div>
          <DiffReader
            original={`const a = 1;\nconst b = 2;\nconst c = a + b;`}
            modified={`const a = 1;\nconst c = a;\n\nconsole.log(c);`}
            language="javascript"
            filename="example.js"
          />
        </div>
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full"></div>
      </div>
    </article>
  );
}
