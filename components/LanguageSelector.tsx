"use client";

import React from "react";

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: "18.15.0",
  java: "15.0.2",
  csharp: "6.12.0",
  cpp: "10.2.0",
  html: "5",
};

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
}) => {
  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none bg-[#1eff002b] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-gray-500"
      >
        {languages.map(([lang, version]) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)} ({version})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
