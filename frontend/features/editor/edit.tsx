import { type FormEvent, useMemo, useCallback } from "react";
import { useStore } from "zustand";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useProjectKeys } from "@/lib/queries";

import type { ProjectKey, ProjectTranslation } from "@/lib/model";

import { useEditorStore } from "./context";

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
      <code>{projectKey}</code>
      <Textarea value={value} onInput={handleInput} />
    </Label>
  );
}

TranslationInput.displayName = "TranslationInput";

interface InnerProps {
  keys: ProjectKey[];
  registry: Registry;
}

function Inner({ keys, registry }: InnerProps) {
  const edits = useStore(useEditorStore(), ({ edits }) => edits);
  const setTranslation = useStore(useEditorStore(), ({ setTranslation }) => setTranslation);

  const translationInputs = useMemo(
    () =>
      keys.map(({ key }) => {
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
    [keys, registry, edits, setTranslation],
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
  if (isPending) return "Fetching translations...";
  if (isError) return "Could not fetch translations.";

  return <Inner keys={keys} registry={registry} />;
}
