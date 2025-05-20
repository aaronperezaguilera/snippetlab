import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Md({ children }: { children: string }) {
  const MarkdownComponents: object = {
    code({
      node,
      inline,
      className,
      ...props
    }: {
      node: any;
      inline: boolean;
      className?: string;
      [key: string]: any;
    }) {
      const hasLang = /language-(\w+)/.exec(className || "");
      return hasLang ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
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
          }}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <div className="prose prose-invert max-w-none [&>pre]:p-0 [&>pre]:bg-background">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: "h2",
          h2: "h3",
          h3: "h4",
          h4: "h5",
          h5: "h6",
          h6: "h6",
          ...MarkdownComponents,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
