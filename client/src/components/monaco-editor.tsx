import { useCallback, useEffect, useMemo, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useTheme } from "../components/theme-provider"; // Adjust the import path
import { useQuery, useMutation } from "@tanstack/react-query";
import debounce from 'lodash/debounce';

declare global {
  interface Window {
    monaco: typeof import("monaco-editor");
  }
}

const MonacoEditor = () => {
  const { theme } = useTheme();
  const monaco = useMonaco();
  const [editorText, setEditorText] = useState<string | null>(null);
  const [queryEditorText, setQueryEditorText] = useState<string | null>(null);

  const saveText = useCallback(debounce((editor_text: string) => {
    setQueryEditorText(editor_text);
  }, 1000), []);

  useEffect(() => {
    if (editorText) {
      saveText(editorText);
    }
  }, [editorText]);
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['retrieve-latex', queryEditorText],
    queryFn: async () => {
      const fileBlob = new Blob([queryEditorText!], { type: 'text/plain' });
      const formData = new FormData();
      formData.append("file", fileBlob, "latex-query.txt");

      const response = await fetch('http://localhost:8000/api/render-latex/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return response.json();
    }
  });
  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + error.message;  
  console.log(data);

  //FUNCTIONALITY FOR AUTO COMPLETE SUGGESTION
  // So if someone types in \resumeList or whatever we decide and click enter

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
      onChange={(value) => setEditorText(value!)}
    />
  );
};

export default MonacoEditor;