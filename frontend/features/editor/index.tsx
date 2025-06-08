"use client";

import { CircleX, Loader2 } from "lucide-react";
import { stableHash } from "stable-hash";

import { useProjectKeys, useProjectLocaleTranslations } from "@/lib/queries";

import { CreateProjectKeyButton } from "@/features/project-key/create";

import { EditorStoreProvider, SearchStoreProvider } from "./context";
import { SaveEditorButton } from "./form";
import { TranslationEditor } from "./edit";
import { SearchBar } from "./search";

export function Editor({ projectId, locale }: { projectId: string; locale: string }) {
  const { data, isPending, isError } = useProjectLocaleTranslations(projectId, locale);
  useProjectKeys(projectId, []); // prefetch to improve request waterfall

  if (isPending)
    return (
      <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-4 w-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-4 w-full flex items-center justify-center">
        <CircleX />
      </div>
    );

  return (
    <main className="w-3/4 xl:w-4/5 flex flex-col space-y-6">
      <SearchStoreProvider>
        <EditorStoreProvider key={stableHash(data)}>
          {/* Toolbar Area */}
          <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-4 flex items-center justify-between min-h-[60px]">
            <SearchBar />
          </div>
          {/* Translation Keys List / Editor Area */}
          <section className="grow flex flex-col gap-y-4 bg-white dark:bg-stone-800 shadow rounded-lg p-4 lg:p-6">
            <div className="flex gap-x-1">
              <h2 className="grow text-xl font-semibold mb-4 text-stone-700 dark:text-stone-300">
                Manage Your Translations
              </h2>
              <CreateProjectKeyButton id={projectId} />
              <SaveEditorButton id={projectId} locale={locale} />
            </div>
            <TranslationEditor id={projectId} translations={data} />
          </section>
        </EditorStoreProvider>
      </SearchStoreProvider>
    </main>
  );
}
