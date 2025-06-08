"use client";

import Link from "next/link";

import { CircleX, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { useProjects } from "@/lib/queries";

interface Project {
  id: string;
  name: string;
}

interface NavigationListProps {
  data: Pick<Project, "id" | "name">[];
  currentProjectId?: string;
}

export function NavigationList({ data, currentProjectId }: NavigationListProps) {
  const children = useMemo(
    () =>
      data.map(({ id, name }) => (
        <li key={id} className="contents">
          <Link
            href={`/dashboard/${id}`}
            title={name}
            className={`
              block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              truncate w-full text-left
              ${
                id === currentProjectId
                  ? "bg-stone-200 text-stone-900 dark:bg-stone-600 dark:text-stone-100"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100"
              }
            `}
          >
            {name}
          </Link>
        </li>
      )),
    [currentProjectId, data],
  );
  return (
    <nav className="contents">
      <ul className="flex flex-col gap-y-1">{children}</ul>
    </nav>
  );
}

export function ProjectList() {
  const { data, isPending, isError } = useProjects();
  const { projectId } = useParams<Partial<{ projectId: string }>>();

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <CircleX />
      </div>
    );
  }

  if (typeof data === "undefined" || data.length === 0) {
    return <div className="flex items-center justify-center text-sm">No projects found.</div>;
  }

  return <NavigationList data={data} currentProjectId={projectId} />;
}
