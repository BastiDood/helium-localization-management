"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProjects } from "@/lib/queries";

function Redirect({ id }: { id: string }) {
  const router = useRouter();
  useEffect(() => router.replace(`/dashboard/${id}`), [id, router]);
  return "Redirecting...";
}

export function RedirectToDefaultProject() {
  const { data, isPending, isError } = useProjects();
  if (isPending) return "Finding projects...";
  if (isError) return "Cannot find projects.";

  const [first] = data;
  return typeof first === "undefined" ? (
    "Get started by creating a project."
  ) : (
    <Redirect id={first.id} />
  );
}
