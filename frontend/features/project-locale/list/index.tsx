"use client";

import Link from "next/link";

import { CircleX, Loader2 } from "lucide-react";

import { useProjectLocales } from "@/lib/queries";

interface ProjectLocaleListProps {
  id: string;
}

export function ProjectLocaleList({ id: projectId }: ProjectLocaleListProps) {
  const { data, isPending, isError } = useProjectLocales(projectId);

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
      </div>
    );
  }

  return (
    <ul>
      {data.map(({ locale, project_id }) => (
        <li key={locale}>
          <Link href={`/dashboard/${project_id}/${locale}`}>{locale}</Link>
        </li>
      ))}
    </ul>
  );
}
