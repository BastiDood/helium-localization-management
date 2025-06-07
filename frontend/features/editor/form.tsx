import Form from "next/form";

import { Loader2, SquarePen } from "lucide-react";
import { decode } from "decode-formdata";
import { toast } from "sonner";
import { useCallback, useMemo } from "react";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";

import { UpsertProjectLocaleTranslationInput } from "@/lib/api";
import { useUpsertProjectLocaleTranslation } from "@/lib/queries";

import { useEditorStore } from "./context";

interface EditorFormProps {
  id: string;
  locale: string;
}

export function SaveEditorButton({ id, locale }: EditorFormProps) {
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

  const edits = useStore(useEditorStore(), ({ edits: translations }) => translations);
  const children = useMemo(
    () =>
      Array.from(edits.entries(), ([key, value]) => (
        <input key={key} type="hidden" name={`data[${key}].translation`} defaultValue={value} />
      )),
    [edits],
  );

  return (
    <Form action={action}>
      <input type="hidden" name="project_id" defaultValue={id} />
      <input type="hidden" name="project_locale" defaultValue={locale} />
      {children}
      {mutation.isPending ? (
        <Button type="button" disabled>
          <Loader2 className="animate-spin" />
          <span>Save</span>
        </Button>
      ) : (
        <Button type="submit" disabled={edits.size === 0}>
          <SquarePen />
          <span>Save</span>
        </Button>
      )}
    </Form>
  );
}
