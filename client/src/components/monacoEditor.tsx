"use client";

import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const MonacoEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null); // Create a ref for the editor container

  useEffect(() => {
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;

    fetch("/public/themes/Monokai.json")
      .then((response) => response.json())
      .then((data) => {
        monaco.editor.defineTheme("monokai", data);
        monaco.editor.setTheme("monokai");
        // More code here
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
      // Dispose of the editor instance on component unmount
      if (editor) {
        editor.dispose();
      }
    };
  }, []);

  return <div ref={editorRef} style={{ height: "500px", width: "100%" }} />;
};

export default MonacoEditor;
