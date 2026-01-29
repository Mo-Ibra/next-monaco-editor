# Next.js Monaco Editor

A powerful local and remote code execution platform built with Next.js and Monaco Editor.

## 🚀 Features

- **Multi-language Support**: Write and run code in multiple languages.
  - **JavaScript**: Local execution with captured console logs.
  - **Java, C#, C++**: Remote execution via the [Piston API](https://github.com/engineer-man/piston).
  - **HTML**: Live secure preview with interactive elements.
- **Monaco Editor Integration**: Pro-grade code editing experience with syntax highlighting and smart features.
- **Real-time Output**: Instant feedback for console logs and compilation errors.
- **Clean Architecture**: Refactored for maintainability with separated concerns.

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **API**: [Piston](https://emkc.org/api/v2/piston) for remote code execution.

## 📁 Project Structure

- `app/page.tsx`: Main application entry point and state management.
- `components/`: Reusable UI components.
  - `CodeEditor.tsx`: Wrapper for the Monaco Editor.
  - `LanguageSelector.tsx`: Dropdown for selecting languages and versions.
  - `OutputWindow.tsx`: Displays text output or HTML preview.
- `lib/`: Utility functions and shared logic.
  - `api.ts`: Logic for remote execution (Piston API).
  - `funcs.ts`: Logic for local execution (JavaScript).
  - `constants.ts`: Centralized configuration for languages and code snippets.

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mo-Ibra/next-monaco-editor.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security

- **HTML Preview**: Runs in an `iframe` with `sandbox="allow-scripts"`. This prevents the executed code from accessing your local storage, cookies, or main document.
- **JavaScript**: Runs via `new Function()`, which is isolated to the client's browser.

## 📄 License

MIT
