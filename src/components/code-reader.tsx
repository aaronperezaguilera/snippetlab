"use client";

import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import CopyButton from "./copy-button";

interface CodeReaderProps {
  filename: string;
  language: string;
  code: string;
}

export function CodeReader({ filename, language, code }: CodeReaderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    import("monaco-themes/themes/Night Owl.json").then((data) => {
      monaco.editor.defineTheme("nightOwl", {
        base: "vs-dark",
        inherit: data.inherit,
        rules: data.rules,
        colors: data.colors,
      });
      monaco.editor.setTheme("nightOwl");
    });

    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
    const minLines = 3;
    const MIN_HEIGHT = lineHeight * minLines;

    if (wrapperRef.current) {
      wrapperRef.current.style.minHeight = `${MIN_HEIGHT}px`;
      wrapperRef.current.style.overflowY = "hidden";
    }

    const updateWrapperHeight = () => {
      const contentHeight = editor.getContentHeight();
      // nunca menos que MIN, ni más que MAX
      const h = Math.min(Math.max(contentHeight, MIN_HEIGHT));
      if (wrapperRef.current) {
        wrapperRef.current.style.height = `${h + 20}px`;
        wrapperRef.current.style.overflowY = "hidden";
      }
    };

    updateWrapperHeight();
    editor.onDidContentSizeChange(updateWrapperHeight);
  };

  return (
    <div>
      <div className="px-4 bg-[#05121f] py-2 border-b border-b-primary/10">
        {filename}
      </div>
      <div ref={wrapperRef} className="w-full bg-[#061626] py-2 pr-2 relative">
        <CopyButton value={code} className="absolute z-50 right-3 top-3" />
        <Editor
          theme="nightOwl"
          language={language}
          defaultValue={code}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
              useShadows: false,
            },
            stickyScroll: {
              enabled: false,
            },
            overviewRulerLanes: 0,
            overviewRulerBorder: false,
            renderLineHighlight: "none",
            fontSize: 14,
            scrollBeyondLastLine: false,
            readOnly: true,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
