"use client";

import React from "react";

interface OutputWindowProps {
  output: string[];
  htmlContent?: string | null;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ output, htmlContent }) => {
  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-[#1e1e1e] text-white">
      <div className="bg-[#2d2d2d] px-4 py-2 text-xs text-gray-400 font-mono border-b border-[#3e3e3e]">
        {htmlContent ? "PREVIEW" : "OUTPUT"}
      </div>
      <div className="flex-1 overflow-hidden">
        {htmlContent ? (
          <iframe
            srcDoc={htmlContent}
            title="preview"
            className="w-full h-full bg-white border-none"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="p-4 font-mono text-sm overflow-auto h-full">
            {output.length > 0 ? (
              output.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap break-all">
                  {line}
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">Run code to see output...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputWindow;
