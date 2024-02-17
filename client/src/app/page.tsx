"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle"; // Adjust the path as necessary

// dynamiclaly importing monaco editor for clientside rendering only w/o serverised
const MonacoEditor = dynamic(() => import("../components/monacoEditor"), {
  ssr: false,
});

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
            <h1 className="font-bold text-8xl">AI.DE</h1>
            <p>
              For the next generation of resume builders and math proof makers.
            </p>
          </div>
          <ModeToggle />
        </nav>
        <div className="flex items-center justify-between">
          <div className="flex w-full h-full rounded-lg overflow-hidden">
            {" "}
            <MonacoEditor />
          </div>

          <div>
            <h1>PDF RENDERERER TO BE CONTINUED</h1>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
