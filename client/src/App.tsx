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
      <main className="flex min-h-screen flex-col items-center justify-between p-32">
        <nav className="w-full flex justify-between items-center mb-4">
          <div className="flex">
            <h1 className="font-bold text-9xl">AI.DE</h1>
            <p className="pt-24 pl-5">
              For the next generation of resume builders and math proof makers.
            </p>
          </div>
          <ModeToggle />
        </nav>
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full h-full rounded-md overflow-hidden">
            {" "}
            <MonacoEditor setEditorText={setEditorText} />
          </div>
            {!isLoading ?
                <PDFViewer filePath={data} />
              // <iframe src={data} width="100%" height="500px" style={{ border: 'none' }}></iframe>
              : null}
        </div>
        <div className="flex w-full h-full items-center justify-between py-10">
          <div className="flex flex-col">
            <div className="z-1 bg-[#e9c7f2] rounded-3xl">
              <h1 className="text-5xl font-bold z-2 py-2 px-2 text-[#a803d2]">
                Discover
              </h1>
            </div>
            <h2>See the commands we offer</h2>
            <ScrollBaby />
          </div>
          <div className="flex flex-col">
            <h1>Search</h1>
            <h2>Look for what piques your interest</h2>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
