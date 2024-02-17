"use client";

import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import { useTheme } from "../components/theme-provider"; // Adjust the import path

const MonacoEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null); // Create a ref for the editor container
  const { theme } = useTheme();

  useEffect(() => {
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;

    const themeFile =
      theme === "dark" ? "/themes/ghDark.json" : "/themes/ghLight.json";
    const monacoThemeName = theme === "dark" ? "ghDark" : "ghLight";

    fetch(themeFile)
      .then((response) => response.json())
      .then((data) => {
        monaco.editor.defineTheme(monacoThemeName, data);
        monaco.editor.setTheme(monacoThemeName);
      })
      .catch((error) => {
        console.error("Failed to load the theme:", error);
      });

    if (editorRef.current) {
      editor = monaco.editor.create(editorRef.current, {
        value: `function hello() {
          alert('Hello world!');
        }`,
        language: "typescript",
        automaticLayout: true,
      });
    }

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
