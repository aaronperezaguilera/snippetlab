"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CopyButton from "./copy-button";
import { Share } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function ShareButton({
  isSnippet = false,
  username,
  slug,
  filename,
}: {
  isSnippet?: boolean;
  username?: string;
  slug?: string;
  filename?: string;
}) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const command = `snippetlab add ${username}/${slug}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Share />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this snippet</DialogTitle>
          <DialogDescription>
            {isSnippet
              ? "You can share this snippet using the URL or download it using the CLI."
              : "You can share this question using the URL."}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={isSnippet ? "cli" : "url"} className="w-full">
          <TabsList className="w-full">
            {isSnippet && (
              <TabsTrigger value="cli">Download using CLI</TabsTrigger>
            )}
            <TabsTrigger value="url">Share URL</TabsTrigger>
          </TabsList>
          {isSnippet && username && slug && (
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
                  <span className="font-semibold">{filename}</span> in your
                  current directory:
                </p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={command}
                    readOnly
                    className="input"
                  />
                  <CopyButton value={command} />
                </div>
              </div>
            </TabsContent>
          )}
          <TabsContent value="url">
            <div className="flex gap-2">
              <Input
                type="text"
                value={currentUrl}
                readOnly
                className="input"
              />
              <CopyButton value={currentUrl} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
