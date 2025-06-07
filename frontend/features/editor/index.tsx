"use client";

import { useProjectLocaleTranslations } from "@/lib/queries";

import { CreateProjectKeyButton } from "@/features/project-key/create";

import { EditorStoreProvider } from "./context";
import { SaveEditorButton } from "./form";

export function Editor({ projectId, locale }: { projectId: string; locale: string }) {
  const { data, isPending, isError } = useProjectLocaleTranslations(projectId, locale);
  if (isPending) return "Fetching translations...";
  if (isError) return "Could not fetch translations.";
  return (
    <EditorStoreProvider translations={data}>
      <main className="w-3/4 xl:w-4/5 flex flex-col space-y-6">
        {/* Toolbar Area */}
        <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-4 flex items-center justify-between min-h-[60px]">
          {/* // TODO: Implement Toolbar Component (e.g., Search, Add Key Button) */}
          <div className="w-full p-3 border border-dashed border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-700 text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center">
            [Toolbar: Search, Actions]
          </div>
        </div>
        {/* Translation Keys List / Editor Area */}
        <section className="flex-grow bg-white dark:bg-stone-800 shadow rounded-lg p-4 lg:p-6">
          <div className="flex gap-x-1">
            <h2 className="grow text-xl font-semibold mb-4 text-stone-700 dark:text-stone-300">
              Manage Your Translations
            </h2>
            <CreateProjectKeyButton id={projectId} />
            <SaveEditorButton projectId={projectId} locale={locale} />
          </div>
        </section>
      </main>
    </EditorStoreProvider>
  );
}
