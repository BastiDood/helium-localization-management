import Form from "next/form";

import { Fragment, useCallback, useMemo } from "react";
import { Loader2, SquarePen } from "lucide-react";
import { decode } from "decode-formdata";
import { toast } from "sonner";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";

import { ProjectTranslation } from "@/lib/model";
import { useUpsertProjectLocaleTranslation } from "@/lib/queries";

import { useEditorStore } from "./context";

interface EditorFormProps {
  id: string;
  locale: string;
}

const ProjectTranslationInput = ProjectTranslation.pick({
  project_id: true,
  project_locale: true,
}).extend({
  data: ProjectTranslation.pick({ project_key: true, translation: true }).array(),
});

export function SaveEditorButton({ id, locale }: EditorFormProps) {
  const mutation = useUpsertProjectLocaleTranslation();
  const action = useCallback(
    async (data: FormData) => {
      const {
        project_id,
        project_locale,
        data: rows,
      } = ProjectTranslationInput.parse(decode(data));
      toast.promise(
        mutation.mutateAsync({
          project_id,
          project_locale,
          data: Object.fromEntries(
            rows.map(({ project_key, translation }) => [project_key, translation]),
          ),
        }),
        {
          loading: "Saving translations...",
          success: updates => {
            const noun = updates.length === 1 ? "translation" : "translations";
            return `${updates.length} ${noun} saved successfully!`;
          },
          error: "Failed to save translations.",
        },
      );
    },
    [mutation],
  );

  const edits = useStore(useEditorStore(), ({ edits: translations }) => translations);
  const children = useMemo(
    () =>
      Array.from(edits.entries(), ([key, value], index) => (
        <Fragment key={key}>
          <input type="hidden" name={`data[${index}].project_key`} defaultValue={key} />
          <input type="hidden" name={`data[${index}].translation`} defaultValue={value} />
        </Fragment>
      )),
    [edits],
  );

  return (
    <Form action={action} aria-label="Save Translations">
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
