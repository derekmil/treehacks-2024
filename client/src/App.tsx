"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle"; // Adjust the path as necessary
import MonacoEditor from "@/components/monaco-editor";
import { ScrollBaby } from "./components/ScrollBaby";

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
      <nav className="h-[5vh] flex flex-row items-center justify-between px-8">
        <h1 className="text-2xl font-bold">AI.DE</h1>
        <ModeToggle />
      </nav>
      <div className="flex flex-row">
        <MonacoEditor />
        <div className="w-[50vw]">
          <div className="flex flex-col w-full h-full items-center justify-between">
            <div className="flex-1">

            </div>
            <ScrollBaby />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
