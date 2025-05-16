"use client";

import React, { useRef } from "react";
import { DiffEditor, DiffOnMount } from "@monaco-editor/react";

interface CodeReaderProps {
  filename: string;
  language: string;
  original: string;
  modified: string;
}

export function DiffReader({
  filename,
  language,
  original,
  modified,
}: CodeReaderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount: DiffOnMount = (editor, monaco) => {
    import("monaco-themes/themes/Night Owl.json").then((data) => {
      monaco.editor.defineTheme("nightOwl", {
        base: "vs-dark",
        inherit: data.inherit,
        rules: data.rules,
        colors: data.colors,
      });
      monaco.editor.setTheme("nightOwl");
    });

    const lineHeight = editor
      .getOriginalEditor()
      .getOption(monaco.editor.EditorOption.lineHeight);
    const minLines = 3;
    const MIN_HEIGHT = lineHeight * minLines;

    if (wrapperRef.current) {
      wrapperRef.current.style.minHeight = `${MIN_HEIGHT}px`;
      wrapperRef.current.style.overflowY = "hidden";
    }

    const updateWrapperHeight = () => {
      const contentHeight = editor.getOriginalEditor().getContentHeight();
      // nunca menos que MIN, ni más que MAX
      const h = Math.min(Math.max(contentHeight, MIN_HEIGHT));
      if (wrapperRef.current) {
        wrapperRef.current.style.height = `${h + 20}px`;
        wrapperRef.current.style.overflowY = "hidden";
      }
    };

    updateWrapperHeight();
  };

  return (
    <div>
      <div ref={wrapperRef} className="w-full bg-[#061626] py-2 pr-2 relative">
        <DiffEditor
          theme="nightOwl"
          language={language}
          original={original}
          modified={modified}
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
            renderSideBySide: false,
            renderOverviewRuler: false,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
