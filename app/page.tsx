"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import OutputWindow from "@/components/OutputWindow";
import LanguageSelector from "@/components/LanguageSelector";
import { executePiston } from "@/lib/api";
import { runJavaScript } from "@/lib/funcs";

const CODE_SNIPPETS: Record<string, string> = {
  javascript: `// Welcome to Monaco Editor!

console.log("Hello from Next.js!");
const sum = (a, b) => a + b;
console.log("Sum 5 + 3 =", sum(5, 3));`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        
        int a = 5;
        int b = 3;
        System.out.println("Sum 5 + 3 = " + (a + b));
    }
}`,
  csharp: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Hello from C#!");
        
        int a = 5;
        int b = 3;
        Console.WriteLine($"Sum 5 + 3 = {a + b}");
    }
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    
    int a = 5;
    int b = 3;
    std::cout << "Sum 5 + 3 = " << (a + b) << std::endl;
    
    return 0;
}`,
  html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; }
        h1 { color: #3b82f6; }
        button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Hello from HTML!</h1>
    <p>This is a live preview of your code.</p>
    <button onclick="alert('Clicked!')">Click Me</button>
</body>
</html>`,
};

const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: "18.15.0",
  java: "15.0.2",
  csharp: "6.12.0",
  cpp: "10.2.0",
  html: "5",
};

export default function Home() {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>(CODE_SNIPPETS["javascript"]);
  const [output, setOutput] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setCode(CODE_SNIPPETS[selectedLanguage] || "");
    setOutput([]);
    setHtmlContent(null);
  };

  const runCode = async () => {
    setOutput([]);
    setHtmlContent(null);
    setIsLoading(true);

    if (language === "javascript") {
      const logs = runJavaScript(code);
      setOutput(logs);
    } else if (language === "html") {
      setHtmlContent(code);
    } else {
      const version = LANGUAGE_VERSIONS[language] || "*";
      const logs = await executePiston(language, version, code);
      setOutput(logs);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-8 font-(family-name:--font-geist-sans) bg-gray-50 dark:bg-gray-900">
      <main className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              Run Code in the browser
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <LanguageSelector language={language} onSelect={handleLanguageChange} />
            <button
              onClick={runCode}
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Running...' : 'Run Code'}
              {!isLoading && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
          <div className="h-full">
            <CodeEditor
              language={language === 'csharp' ? 'csharp' : language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(newCode) => setCode(newCode || "")}
              height="100%"
            />
          </div>
          <div className="h-full">
            <OutputWindow output={output} htmlContent={htmlContent} />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Built with Next.js 16 and @monaco-editor/react
        </div>
      </main>
    </div>
  );
}
