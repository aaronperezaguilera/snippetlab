"use client";

import React, { useRef } from "react";
import { DiffEditor, DiffOnMount } from "@monaco-editor/react";

interface CodeReaderProps {
  filename: string;
  language: string;
  original: string;
  modified: string;
}

export function DiffReader({ language, original, modified }: CodeReaderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount: DiffOnMount = (editor, monaco) => {
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
      const contentHeight = editor.getModifiedEditor().getContentHeight();

      const MIN = MIN_HEIGHT;
      const MAX = 800; // por ejemplo, límite máximo en píxeles

      const h = Math.min(Math.max(contentHeight, MIN), MAX);

      if (wrapperRef.current) {
        wrapperRef.current.style.height = `${h + 20}px`;
        wrapperRef.current.style.overflowY = "hidden";
      }
    };

    updateWrapperHeight();
    editor.getOriginalEditor().onDidContentSizeChange(updateWrapperHeight);
    editor.getModifiedEditor().onDidContentSizeChange(updateWrapperHeight);
  };

  return (
    <div>
      <div ref={wrapperRef} className="w-full bg-[#1e1e1e] py-2 pr-2 relative">
        <DiffEditor
          theme="vs-dark"
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
