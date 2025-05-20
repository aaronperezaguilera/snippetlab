import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "../copy-button";
import { Input } from "../ui/input";

export function CLICard() {
  return (
    <article className="border flex flex-col gap-8 col-span-4 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Share & Download</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Copy the command from the share button and paste it into your terminal
          to download and embed the snippet directly into your project or send
          the url to your friends.
        </p>
      </div>

      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col gap-4 relative">
        <div className="rounded-sm bg-background border p-4 flex flex-col gap-4">
          <div>
            <h4>Share this snippet</h4>
            <p className="text-muted-foreground text-pretty">
              You can share this snippet using the URL or download it using the
              CLI.
            </p>
          </div>
          <Tabs defaultValue="cli" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="cli">Download using CLI</TabsTrigger>

              <TabsTrigger value="url">Share URL</TabsTrigger>
            </TabsList>
            <TabsContent value="cli">
              <div className="flex flex-col gap-4">
                <p>Make sure you have installed SnippetLab CLI</p>

                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  showLineNumbers={false}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "14px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  {`npm install -g snippetlab
# or
pnpm add -g snippetlab`}
                </SyntaxHighlighter>
                <p className="text-sm text-muted-foreground">
                  Type --help for more options
                </p>
                <p>
                  Execute the following command to create file{" "}
                  <span className="font-semibold">useToggle.ts</span> in your
                  current directory:
                </p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value="snippetlab add aaron/usetoggle-hook"
                    readOnly
                    className="input"
                  />
                  <CopyButton value="" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full z-50"></div>
      </div>
    </article>
  );
}
