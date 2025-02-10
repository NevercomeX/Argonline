// src/components/ClientProviders.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </QueryClientProvider>
  );
}
