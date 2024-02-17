import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import MonacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
