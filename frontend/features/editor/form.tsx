import Form from "next/form";

import { Loader2, SquarePen } from "lucide-react";
import { decode } from "decode-formdata";
import { toast } from "sonner";
import { useCallback, useMemo, useTransition } from "react";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";

import { UpsertProjectLocaleTranslationInput } from "@/lib/api";
import { useUpsertProjectLocaleTranslation } from "@/lib/queries";

import { useEditorStore } from "./context";

interface EditorFormProps {
  projectId: string;
  locale: string;
}

export function SaveEditorButton({ projectId, locale }: EditorFormProps) {
  const mutation = useUpsertProjectLocaleTranslation();
  const action = useCallback(
    async (data: FormData) => {
      const input = UpsertProjectLocaleTranslationInput.parse(decode(data));
      toast.promise(mutation.mutateAsync(input), {
        loading: "Saving translations...",
        success: updates => `${updates.length} translations saved successfully!`,
        error: "Failed to save translations.",
      });
    },
    [mutation],
  );

  const translations = useStore(useEditorStore(), ({ translations }) => translations);
  const children = useMemo(
    () =>
      Array.from(translations.entries(), ([key, value]) => (
        <input type="hidden" name={`data[${key}].translation`} defaultValue={value} />
      )),
    [translations],
  );

  return (
    <Form action={action}>
      <input type="hidden" name="project_id" defaultValue={projectId} />
      <input type="hidden" name="project_locale" defaultValue={locale} />
      {children}
      {mutation.isPending ? (
        <Button type="button" disabled>
          <Loader2 className="animate-spin" />
          <span>Save</span>
        </Button>
      ) : (
        <Button type="submit" disabled={translations.size === 0}>
          <SquarePen />
          <span>Save</span>
        </Button>
      )}
    </Form>
  );
}
