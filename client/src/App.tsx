"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import MonacoEditor from "@/components/monaco-editor";
import { useQuery } from "@tanstack/react-query";
import PDFViewer from "@/components/pdf";
import {latexTemplate} from '@/components/defaultText';
import { Skeleton } from "@/components/ui/skeleton"
import {NavBar} from "@/components/navbar";
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
      <main className="flex min-h-screen flex-col items-center justify-between px-16">
        <NavBar />
        <hr></hr>
        {/* <nav className="w-full flex justify-between items-center mb-4">
          <div className="flex">
            <h1 className="font-bold text-9xl">AI.DE</h1>
            <p className="pt-24 pl-5">
              For the next generation of resume builders and math proof makers.
            </p>
          </div>
          <ModeToggle />
        </nav> */}
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full h-full rounded-md overflow-hidden">
            {" "}
            <MonacoEditor editorText = {editorText} setEditorText={setEditorText} />
          </div>
            {!isLoading ?
                <PDFViewer filePath={data} />
              : <Skeleton className="w-8/12 h-[792px] rounded-[10px]" />
              }
        </div>
      </main>
  );
}
