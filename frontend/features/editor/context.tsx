import { type ReactNode, createContext, useContext, useState } from "react";
import { createStore } from "zustand";

import type { ProjectTranslation } from "@/lib/model";

type ProjectTranslationKey = ProjectTranslation["project_key"];
type ProjectTranslationText = ProjectTranslation["translation"];
interface EditorStore {
  edits: Map<ProjectTranslationKey, ProjectTranslationText>;
  setTranslation: (key: ProjectTranslationKey, text: ProjectTranslationText) => void;
}

function createEditorStore() {
  return createStore<EditorStore>(set => ({
    edits: new Map(),
    setTranslation: (key, text) => set(({ edits }) => ({ edits: new Map(edits).set(key, text) })),
  }));
}

const EditorStoreContext = createContext(createEditorStore());
export function EditorStoreProvider({ children }: { children: ReactNode }) {
  // https://tkdodo.eu/blog/zustand-and-react-context
  const [store] = useState(createEditorStore);
  return <EditorStoreContext.Provider value={store} children={children} />;
}

export function useEditorStore() {
  return useContext(EditorStoreContext);
}

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
}

function createSearchStore() {
  return createStore<SearchStore>(set => ({
    query: "",
    setQuery: query => set({ query }),
  }));
}

const SearchStoreContext = createContext(createSearchStore());
export function SearchStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createSearchStore);
  return <SearchStoreContext.Provider value={store} children={children} />;
}

export function useSearchStore() {
  return useContext(SearchStoreContext);
}
