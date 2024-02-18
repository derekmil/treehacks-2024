import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Docs from './Docs.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({});
import { ThemeProvider } from "@/components/theme-provider";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    </React.StrictMode>,
  </QueryClientProvider>
)
