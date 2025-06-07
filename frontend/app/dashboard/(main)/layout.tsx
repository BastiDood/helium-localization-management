"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import type { ReactNode } from "react";

import { CreateProjectButton } from "@/features/project/create";
import { ProjectList } from "@/features/project/list";

const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const { projectId } = useParams<Partial<{ projectId: string }>>();
  return (
    <QueryClientProvider client={client}>
      <div className="flex flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        <aside className="w-1/4 xl:w-1/5 p-4 bg-white dark:bg-stone-800 shadow rounded-lg mr-8 space-y-6">
          <div>
            <h2 className="flex items-center gap-x-1 text-lg font-semibold mb-3 text-stone-700 dark:text-stone-300">
              Navigation <CreateProjectButton />
            </h2>
            <div className="p-3 border border-dashed border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-700 text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center">
              <ProjectList />
            </div>
          </div>
          {typeof projectId === "undefined" ? null : (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-stone-700 dark:text-stone-300">
                Languages
              </h2>
              {/* // TODO: Implement Language Selector Component */}
              <div className="p-3 border border-dashed border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-700 text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center">
                [Language Selection Area]
              </div>
            </div>
          )}
        </aside>
        {children}
      </div>
    </QueryClientProvider>
  );
}
