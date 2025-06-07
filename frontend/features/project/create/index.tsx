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

import { CreateProjectInput } from "@/lib/api";
import { useCreateProject } from "@/lib/queries";

function Content({ closeDialog }: { closeDialog: () => void }) {
  const mutation = useCreateProject();
  const action = useCallback(
    async (data: FormData) => {
      await mutation.mutateAsync(CreateProjectInput.parse(decode(data)));
      closeDialog();
    },
    [closeDialog, mutation],
  );

  return (
    <Form action={action} className="flex flex-col gap-y-4">
      <Input type="text" required name="name" placeholder="My Project" />
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

export function CreateProjectButton() {
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
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Enter a new project name to get started.</DialogDescription>
        </DialogHeader>
        <Content closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
