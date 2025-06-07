import { type ReactNode, createContext, useContext, useState } from "react";
import { createStore } from "zustand";

import type { ProjectTranslation } from "@/lib/model";

type ProjectTranslationKey = ProjectTranslation["project_key"];
type ProjectTranslationText = ProjectTranslation["translation"];
interface EditorStore {
  translations: Map<ProjectTranslationKey, ProjectTranslationText>;
  setTranslation: (key: ProjectTranslationKey, text: ProjectTranslationText) => void;
}

export function createEditorStore(translations: ProjectTranslation[]) {
  return createStore<EditorStore>(set => ({
    translations: new Map(
      translations.map(({ project_key, translation }) => [project_key, translation]),
    ),
    setTranslation: (key, text) =>
      set(({ translations }) => ({ translations: new Map(translations).set(key, text) })),
  }));
}

interface EditorStoreProviderProps {
  children: ReactNode;
  translations: ProjectTranslation[];
}

const EditorStoreContext = createContext(createEditorStore([]));
export function EditorStoreProvider({ children, translations }: EditorStoreProviderProps) {
  // https://tkdodo.eu/blog/zustand-and-react-context
  const [store] = useState(() => createEditorStore(translations));
  return <EditorStoreContext.Provider value={store} children={children} />;
}

export function useEditorStore() {
  return useContext(EditorStoreContext);
}
