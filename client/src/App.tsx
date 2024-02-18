"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import MonacoEditor from "@/components/monaco-editor";
import { useQuery, useMutation } from "@tanstack/react-query";
import PDFViewer from "@/components/pdf";

import { ScrollBaby } from "@/components/ScrollBaby";
import {latexTemplate} from '@/components/defaultText';


const value = /* set from `myEditor.getModel()`: */ `function hello() {
  alert('Hello world!');
}`;

export default function Home() {
  // const [pdfPath, setPdfPath] = useState("");
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
        <div className="flex flex-row items-center justify-between overflow-hidden">
          <MonacoEditor setEditorText={setEditorText} />
          <div className="w-[50vw] flex flex-col justify-between h-[95vh]">
            {!isLoading ?
                <PDFViewer filePath={data} />
              // <iframe src={data} width="100%" height="500px" style={{ border: 'none' }}></iframe>
              : <div></div>}
            <div className="flex w-full items-center justify-between py-10">
              <ScrollBaby />
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
