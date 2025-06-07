"use client";

import { CircleX, Loader2 } from "lucide-react";

import Link from "next/link";

import { useProjects } from "@/lib/queries";

export function ProjectList() {
  const { data, isPending, isError } = useProjects();

  if (isPending) {
    return (
      <div className="flex items-center gap-x-2">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-x-2">
        <CircleX />
        <span>Error</span>
      </div>
    );
  }

  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/dashboard/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
