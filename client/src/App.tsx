"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import MonacoEditor from "@/components/monaco-editor";
import { useQuery } from "@tanstack/react-query";
import PDFViewer from "@/components/pdf";
import { latexTemplate } from '@/components/defaultText';

import { ScrollBaby } from "@/components/ScrollBaby";

import { useMonaco } from "@monaco-editor/react";
import AutocompleteService from "./lib/service/AutocompleteService";

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
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  useEffect(() => {
    (async () => {
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


            //call ai_complete api
            const prompt = lineContent.replace(/\%|ai/g, '');
            setCurrentPrompt(prompt);
            const completion = await AutocompleteService.getPromptResponse(prompt);

            // Assuming `monaco` is the global object for the Monaco Editor API
            // and `editor` is your Monaco Editor instance
            if (monaco) {
              monaco.languages.registerCompletionItemProvider('latex', {
                
                provideCompletionItems: function(model, position) {
                    // find word at cursor position
                    var word = model.getWordAtPosition(position);

                    
                    var range = {
                      startLineNumber: position.lineNumber,
                      endLineNumber: position.lineNumber,
                      startColumn: word ? word.startColumn : position.column,
                      endColumn: word ? word.endColumn : position.column
                    };
                    
                  
                    return {
                        suggestions: [{
                            label: 'MyCompletion',
                            kind: monaco.languages.CompletionItemKind.Function,
                            documentation: 'This is a custom completion item',
                            insertText: completion.content,
                            range: range
                        }]
                    };
                }
              });       
            }
          }
        }
      }
    })();
  }, [editorText]);


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
            <MonacoEditor editorText={editorText} setEditorText={setEditorText} />
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
