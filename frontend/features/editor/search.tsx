import { type FormEvent, useCallback } from "react";
import { useStore } from "zustand";

import { Input } from "@/components/ui/input";

import { useSearchStore } from "./context";

export function SearchBar() {
  const store = useSearchStore();
  const query = useStore(store, ({ query }) => query);
  const setQuery = useStore(store, ({ setQuery }) => setQuery);
  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => setQuery(event.currentTarget.value),
    [setQuery],
  );
  return (
    <Input
      type="text"
      placeholder="Search translation keys..."
      value={query}
      onChange={handleChange}
    />
  );
}
