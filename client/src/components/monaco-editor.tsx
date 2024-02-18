import { useCallback, useEffect, useMemo, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useTheme } from "../components/theme-provider"; // Adjust the import path
import debounce from 'lodash/debounce';
declare global {
  interface Window {
    monaco: typeof import("monaco-editor");
  }
}

const MonacoEditor = ({
  setEditorText,
}: {
  setEditorText: (path: string) => void;
}) => {
  const { theme } = useTheme();
  const monaco = useMonaco();

  const handleDebounceText = useCallback(debounce((value: any) => {
    setEditorText(value);
  }, 1000), []);

  useEffect(() => {
    if (monaco) {
      // Register a completion item provider for the TypeScript language
      monaco.languages.registerCompletionItemProvider("typescript", {
        triggerCharacters: ["/"], // Trigger suggestions on '/'
        provideCompletionItems: function (model, position) {
          console.log("Completion provider triggered");
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          if (word.word.startsWith("/")) {
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
                // Additional suggestions can be added here
              ],
            };
          }

          return { suggestions: [] };
        },
      });
    }
  }, [monaco]);
  //FUNCTIONALITY FOR AUTO COMPLETE SUGGESTION
  // So if someone types in \resumeList or whatever we decide and click enter

  return (
    <Editor
      height="500px"
      defaultLanguage="typescript"
      defaultValue="// some comment"
      theme={theme === "dark" ? "vs-dark" : "light"} // Use monaco's built-in themes as fallback
      beforeMount={(monaco) => {
        // able to  can extend monaco functionalities if needed before mounting the editor
        // For example, registering completion item providers
      }}
      onChange={(value) => handleDebounceText(value!)}
    />
  );
};

export default MonacoEditor;