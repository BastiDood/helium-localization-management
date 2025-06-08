"use client";

import { CircleX, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/lib/queries";

function Redirect({ id }: { id: string }) {
  const router = useRouter();
  useEffect(() => router.replace(`/dashboard/${id}`), [id, router]);
  return <Loader2 className="animate-spin" />;
}

export function RedirectToDefaultProject() {
  const { data, isPending, isError } = useProjects();
  if (isPending) return <Loader2 className="animate-spin" />;
  if (isError) return <CircleX />;

  const [first] = data;
  return typeof first === "undefined" ? (
    "Get started by creating a project."
  ) : (
    <Redirect id={first.id} />
  );
}
