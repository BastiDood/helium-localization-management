"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import type { ReactNode } from "react";

import { CreateProjectButton } from "@/features/project/create";
import { CreateProjectLocaleButton } from "@/features/project-locale/create";
import { ProjectList } from "@/features/project/list";
import { ProjectLocaleList } from "@/features/project-locale/list";

const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const { projectId, locale } = useParams<Partial<{ projectId: string; locale: string }>>();
  return (
    <QueryClientProvider client={client}>
      <div className="flex grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        {typeof projectId === "undefined" ? null : (
          <aside className="w-64 flex-shrink-0 p-4 bg-white dark:bg-stone-800 shadow rounded-lg mr-8 space-y-3 overflow-hidden">
            <div>
              <h2 className="flex items-center justify-between gap-x-2 text-lg font-semibold mb-3 text-stone-700 dark:text-stone-300 min-w-0">
                <span className="truncate">Projects</span>
                <CreateProjectButton />
              </h2>
              <ProjectList id={projectId} locale={locale} />
            </div>
            <div>
              <h2 className="flex items-center gap-x-2 justify-between text-lg font-semibold mb-3 text-stone-700 dark:text-stone-300 min-w-0">
                <span className="truncate">Languages</span>
                <CreateProjectLocaleButton id={projectId} />
              </h2>
              <ProjectLocaleList id={projectId} />
            </div>
          </aside>
        )}
        {children}
      </div>
    </QueryClientProvider>
  );
}
