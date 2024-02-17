import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import { useTheme } from "../components/theme-provider"; // Adjust the import path

const MonacoEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null); // Create a ref for the editor container
  const { theme } = useTheme();

  useEffect(() => {
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;

    // logic regarding the theme
    const themeFile =
      theme === "dark" ? "/themes/ghDark.json" : "/themes/ghLight.json";
    const monacoThemeName = theme === "dark" ? "ghDark" : "ghLight";

    // fetching theme file data
    fetch(themeFile)
      .then((response) => response.json())
      .then((data) => {
        monaco.editor.defineTheme(monacoThemeName, data);
        monaco.editor.setTheme(monacoThemeName);
      })
      .catch((error) => {
        console.error("Failed to load the theme:", error);
      });

    // this is a useRef for describing the editor langauge, but this depends on our monaco editor and might not need
    if (editorRef.current) {
      editor = monaco.editor.create(editorRef.current, {
        value: `function hello() {
          alert('Hello world!');
        }`,
        language: "typescript",
        automaticLayout: true,
      });
    }

    //FUNCTIONALITY FOR AUTO COMPLETE SUGGESTION
    // So if someone types in \resumeList or whatever we decide and click enter
    monaco.languages.registerCompletionItemProvider("typescript", {
      triggerCharacters: ["/"], // Trigger suggestions on '/'
      provideCompletionItems: function (model, position) {
        console.log("Completion triggered");
        //this is how much text around the word we should replace
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
              // You can add more snippets here
            ],
          };
        }

        return { suggestions: [] };
      },
    });

    return () => {
      // Dispose of the editor instance on component unmount (clean up of resources type shit)
      if (editor) {
        editor.dispose();
      }
    };
  }, [theme]);

  return <div ref={editorRef} style={{ height: "500px", width: "100%" }} />;
};

export default MonacoEditor;
