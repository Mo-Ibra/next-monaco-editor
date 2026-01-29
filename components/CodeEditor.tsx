"use client";

import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  defaultValue = "// some comment",
  value,
  onChange,
  height = "500px",
}) => {
  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
      style={{ height }}
    >
      <Editor
        height="100%"
        language={language}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
