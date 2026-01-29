"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import OutputWindow from "@/components/OutputWindow";
import LanguageSelector from "@/components/LanguageSelector";
import { executePiston } from "@/lib/api";
import { runJavaScript } from "@/lib/funcs";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "@/lib/constants";

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
    <div className="min-h-screen p-8 flex justify-center items-center bg-gray-900">

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
