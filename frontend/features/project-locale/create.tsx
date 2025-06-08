"use client";

import Form from "next/form";

import { Loader2, Plus } from "lucide-react";
import { decode } from "decode-formdata";
import { toast } from "sonner";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { CreateProjectLocaleInput } from "@/lib/api";
import { useCreateProjectLocale } from "@/lib/queries";

function Content({ projectId, closeDialog }: { projectId: string; closeDialog: () => void }) {
  const mutation = useCreateProjectLocale();
  const action = useCallback(
    async (data: FormData) => {
      const formData = decode(data);
      const result = await mutation.mutateAsync(
        CreateProjectLocaleInput.parse({
          project_id: projectId,
          locale: formData.locale,
        }),
      );
      if (result === null)
        toast.error("Locale already exists", {
          description: "Cannot create a duplicate locale for this project.",
        });
      else closeDialog();
    },
    [projectId, closeDialog, mutation],
  );

  return (
    <Form action={action} className="space-y-4">
      <Input type="text" required name="locale" placeholder="en-US" />
      <div className="flex justify-end">
        {mutation.isPending ? (
          <Button type="button" disabled>
            <Loader2 className="animate-spin" />
            <span>Create</span>
          </Button>
        ) : (
          <Button type="submit">
            <Plus />
            <span>Create</span>
          </Button>
        )}
      </div>
    </Form>
  );
}

interface CreateProjectLocaleButtonProps {
  id: string;
}

export function CreateProjectLocaleButton({ id: projectId }: CreateProjectLocaleButtonProps) {
  const [open, setOpen] = useState(false);
  const closeDialog = useCallback(() => setOpen(false), []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="size-6">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Language</DialogTitle>
          <DialogDescription>
            Enter a locale code to add a new language to this project.
          </DialogDescription>
        </DialogHeader>
        <Content projectId={projectId} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
