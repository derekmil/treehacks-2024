import { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useTheme } from "../components/theme-provider"; // Adjust the import path
import { setupLanguage } from "@/lib/latex/setup";
import { keywords } from "@/lib/latex/latex";

declare global {
  interface Window {
    monaco: typeof import("monaco-editor-core");
  }
}

const MonacoEditor = () => {
  const { theme } = useTheme();
  const monaco = useMonaco();

  //FUNCTIONALITY FOR AUTO COMPLETE SUGGESTION
  // So if someone types in \resumeList or whatever we decide and click enter

  useEffect(() => {
    if (monaco) {
      // Register a completion item provider for the TypeScript language
      monaco.languages.registerCompletionItemProvider("latex", {
        triggerCharacters: ["/"], // Trigger suggestions on '/'
        provideCompletionItems: function (model: any, position: any) {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return {
            suggestions: [
              {
                label: "/list",
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: "Insert a LaTeX list template",
                insertText: [
                  "\\begin{itemize}",
                  "  \\item First item",
                  "  \\item Second item",
                  "\\end{itemize}",
                ].join("\n"),
                range: range,
              },
            ],
          };
        },
      });

      monaco.languages.registerCompletionItemProvider("latex", {
        triggerCharacters: ["\\"], // Trigger suggestions on '/'
        provideCompletionItems: function (model: any, position: any) {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return {
            suggestions: keywords.filter(w => w.startsWith(word.word)).map((label) => ({
              label,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: label,
              range,
            }))
          };
        },
      });
    }
  }, [monaco]);

  return (
    <Editor
      height="500px"
      defaultLanguage="latex"
      defaultValue="\textbf{hello}"
      theme={theme === "dark" ? "vs-dark" : "light"} // Use monaco's built-in themes as fallback
      beforeMount={(monaco) => {
        setupLanguage(monaco);
        // able to  can extend monaco functionalities if needed before mounting the editor
        // For example, registering completion item providers
      }}
      onChange={(value, event) => {
        // Handle editor changes if necessary
      }}
    />
  );
};

export default MonacoEditor;