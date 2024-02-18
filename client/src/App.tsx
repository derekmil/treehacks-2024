"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle"; // Adjust the path as necessary
import MonacoEditor from "@/components/monaco-editor";
import { ScrollBaby } from "@/components/ScrollBaby";

const value = /* set from `myEditor.getModel()`: */ `function hello() {
	alert('Hello world!');
}`;

export default function Home() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
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
        <div className="flex items-center justify-between">
          <div className="flex w-full h-full rounded-md overflow-hidden">
            {" "}
            <MonacoEditor />
          </div>

          <div>
            <h1>PDF RENDERERER TO BE CONTINUED</h1>
          </div>
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
