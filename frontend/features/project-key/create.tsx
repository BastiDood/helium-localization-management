"use client";

import Form from "next/form";

import { Loader2, Plus } from "lucide-react";
import { decode } from "decode-formdata";
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

import { CreateProjectKeyInput } from "@/lib/api";
import { useCreateProjectKey } from "@/lib/queries";

interface ContentProps {
  id: string;
  closeDialog: () => void;
}

function Content({ id, closeDialog }: ContentProps) {
  const mutation = useCreateProjectKey();
  const action = useCallback(
    async (data: FormData) => {
      const input = CreateProjectKeyInput.parse(decode(data));
      await mutation.mutateAsync(input);
      closeDialog();
    },
    [mutation, closeDialog],
  );

  return (
    <Form action={action} className="space-y-4">
      <input type="hidden" name="project_id" defaultValue={id} />
      <Input type="text" required name="key" placeholder="button.call-to-action" />
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

interface CreateProjectLocaleTranslationButtonProps {
  id: string;
}

export function CreateProjectKeyButton({ id }: CreateProjectLocaleTranslationButtonProps) {
  const [open, setOpen] = useState(false);
  const closeDialog = useCallback(() => setOpen(false), []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <Plus />
          <span>Add Translation Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Translation Key</DialogTitle>
          <DialogDescription>Enter a new translation keyfor the current locale.</DialogDescription>
        </DialogHeader>
        <Content id={id} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
