"use client";

import React, { useRef } from "react";

import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  code: string | undefined;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ language, code, onChange }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // 1) altura de una línea en px
    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);

    // 2) desactivar scroll vertical para no tener barras
    editor.updateOptions({
      scrollbar: { vertical: "hidden", horizontal: "hidden" },
      minimap: { enabled: false },
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      renderLineHighlight: "line",
      scrollBeyondLastLine: false,
    });

    // 3) fijar altura inicial a 1 línea
    if (containerRef.current) {
      containerRef.current.style.height = `${lineHeight}px`;
    }

    // 4) cada vez que cambie el tamaño del contenido, re-ajustamos el contenedor
    editor.onDidContentSizeChange((e) => {
      if (containerRef.current) {
        // altura = máximo entre el contenido o la línea mínima
        const newHeight = Math.max(e.contentHeight, lineHeight);
        containerRef.current.style.height = `${newHeight}px`;
        editor.layout(); // re-layout interno
      }
    });
  };

  return (
    <div ref={wrapperRef} className="w-full bg-[#1e1e1e] py-2 pr-2">
      <div ref={containerRef} className="w-full min-h-48 max-h-[500px]">
        <Editor
          theme="vs-dark"
          language={language}
          defaultValue={code}
          onChange={(value) => onChange(value)}
          options={{
            minimap: { enabled: false },
            scrollbar: {
              vertical: "visible",
              horizontal: "hidden",
              useShadows: false,
            },
            stickyScroll: {
              enabled: false,
            },
            overviewRulerLanes: 0,
            overviewRulerBorder: false,
            renderLineHighlight: "none",
            automaticLayout: true,
            fontSize: 14,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
