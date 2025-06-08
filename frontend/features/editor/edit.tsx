import { CircleX, Edit3, Loader2 } from "lucide-react";
import { type FormEvent, useMemo, useCallback } from "react";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import { useStore } from "zustand";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useProjectKeys } from "@/lib/queries";

import type { ProjectKey, ProjectTranslation } from "@/lib/model";

import { useEditorStore, useSearchStore } from "./context";

type Registry = Map<ProjectTranslation["project_key"], ProjectTranslation["translation"]>;

interface TranslationInputProps {
  projectKey: string;
  value: string;
  onTranslationChange: (key: string, value: string) => void;
}

function TranslationInput({ projectKey, value, onTranslationChange }: TranslationInputProps) {
  const handleInput = useCallback(
    (event: FormEvent<HTMLTextAreaElement>) =>
      onTranslationChange(projectKey, event.currentTarget.value),
    [projectKey, onTranslationChange],
  );
  return (
    <Label className="flex-col items-start">
      <div className="flex items-center gap-x-2">
        <Edit3 />
        <code>{projectKey}</code>
      </div>
      <Textarea value={value} onInput={handleInput} />
    </Label>
  );
}

function getText({ key }: ProjectKey) {
  return [key];
}

function mapResultItem({ item }: { item: ProjectKey }) {
  return item;
}

interface InnerProps {
  keys: ProjectKey[];
  registry: Registry;
}

function Inner({ keys, registry }: InnerProps) {
  const query = useStore(useSearchStore(), ({ query }) => query);
  const filtered = useFuzzySearchList({ list: keys, queryText: query, getText, mapResultItem });
  const rendered = query.length === 0 ? keys : filtered;

  const edits = useStore(useEditorStore(), ({ edits }) => edits);
  const setTranslation = useStore(useEditorStore(), ({ setTranslation }) => setTranslation);

  const translationInputs = useMemo(
    () =>
      rendered.map(({ key }) => {
        const value = edits.get(key) ?? registry.get(key) ?? "";
        return (
          <TranslationInput
            key={key}
            projectKey={key}
            value={value}
            onTranslationChange={setTranslation}
          />
        );
      }),
    [rendered, registry, edits, setTranslation],
  );

  return <div className="space-y-4">{translationInputs}</div>;
}

interface EditTranslationsProps {
  id: string;
  translations: ProjectTranslation[];
}

export function TranslationEditor({ id, translations }: EditTranslationsProps) {
  const registry = useMemo(
    () => new Map(translations.map(({ project_key, translation }) => [project_key, translation])),
    [translations],
  );

  const { data: keys, isPending, isError } = useProjectKeys(id);

  if (isPending)
    return (
      <div className="grow flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="grow flex items-center justify-center">
        <CircleX />
      </div>
    );

  return <Inner keys={keys} registry={registry} />;
}
