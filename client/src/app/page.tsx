import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

// dynamiclaly importing monaco editor for clientside rendering only w/o serverised
const MonacoEditor = dynamic(() => import("../components/monacoEditor"), {
  ssr: false,
});

const value = /* set from `myEditor.getModel()`: */ `function hello() {
	alert('Hello world!');
}`;

export default function Home() {
  return (
    <main className="flex min-h-screen flex items-center justify-between p-24">
      <div className="flex w-full h-full">
        <MonacoEditor />
      </div>

      <div>
        <h1>PDF RENDERERER TO BE CONTINUED</h1>
      </div>
    </main>
  );
}
