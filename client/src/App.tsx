"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import MonacoEditor from "@/components/monaco-editor";
import { useQuery } from "@tanstack/react-query";
import PDFViewer from "@/components/pdf";
import { ScrollBaby } from "@/components/ScrollBaby";

import { useMonaco } from "@monaco-editor/react";

const value = /* set from `myEditor.getModel()`: */ `function hello() {
  alert('Hello world!');
}`;

export default function Home() {
  // const [pdfPath, setPdfPath] = useState("");

  const monaco = useMonaco();

  //const [editorText, setEditorText] = useState<string>('');


  const [editorText, setEditorText] = useState<string>("");

  const { isLoading, data } = useQuery({
    queryKey: ['retrieve-latex', editorText],
    queryFn: async () => {
      const latexContent = editorText.replace(/\\/g, '\\\\');

      const response = await fetch('http://localhost:8000/api/render-latex/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex: latexContent }),
      });
      let data = await response.blob();
      const url = URL.createObjectURL(data);
      return url;
    },
    enabled: !!editorText, // This ensures the query doesn't run until editorText is not empty
  });

  useEffect(() => {

    const keyword = "/ai";

    if (editorText.includes(keyword)) {
      console.log("found keyword");
      // Get the line count
      const lines = editorText.split("\n");
      const lineIndex = lines.findIndex(line => line.includes(keyword));
      // Get the content of the last line
      if (lineIndex !== -1) { // Check if keyword is found
        // Get the content of the line
        const lineContent = lines[lineIndex];
        console.log("Line containing keyword:", lineContent);
        const newEditorText = editorText.replace(keyword, "Submitted");
        console.log("Editor text:", newEditorText);
        setEditorText(newEditorText);

        var currentEditor = monaco?.editor.getModels()[0];
        if (currentEditor) {
          const editOperation = {
            range: currentEditor.getFullModelRange(),
            text: newEditorText,
            forceMoveMarkers: true,
          };
          currentEditor.applyEdits([editOperation]);
        }
      }
    }
  }, [editorText]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="flex min-h-screen flex-col items-center justify-between">
        <nav className="w-screen flex justify-between items-center mb-4 p-1 h-[5vh]">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="font-bold text-3xl">AI.DE</h1>
            <div className="flex flex-row items-center space-x-4">
              <p>For the next generation of resume builders and math proof makers.</p>
              <ModeToggle />
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full h-full rounded-md overflow-hidden">
            {" "}
            <MonacoEditor
              editorText={value}
              setEditorText={setEditorText}
            />
          </div>
          {!isLoading ?
            <PDFViewer filePath={data} />
            // <iframe src={data} width="100%" height="500px" style={{ border: 'none' }}></iframe>
            : <div></div>}
          <div className="flex w-full items-center justify-between py-10">
            <ScrollBaby />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
