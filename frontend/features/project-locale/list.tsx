"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { CircleX, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useProjectLocales } from "@/lib/queries";

interface ProjectLocale {
  locale: string;
  project_id: string;
}

interface NavigationListProps {
  data: ProjectLocale[];
  currentLocale?: string;
}

function NavigationList({ data, currentLocale }: NavigationListProps) {
  const children = useMemo(
    () =>
      data.map(({ locale, project_id }) => (
        <li key={locale} className="contents">
          <Link
            href={`/dashboard/${project_id}/${locale}`}
            title={locale}
            className={cn(
              "block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 truncate w-full text-left",
              locale === currentLocale
                ? "bg-stone-200 text-stone-900 dark:bg-stone-600 dark:text-stone-100"
                : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100",
            )}
          >
            {locale}
          </Link>
        </li>
      )),
    [currentLocale, data],
  );
  return (
    <nav className="contents">
      <ul className="flex flex-col gap-y-1">{children}</ul>
    </nav>
  );
}

interface ProjectLocaleListProps {
  id: string;
}

export function ProjectLocaleList({ id: projectId }: ProjectLocaleListProps) {
  const { data, isPending, isError } = useProjectLocales(projectId);
  const { locale: currentLocale } = useParams<Partial<{ locale: string }>>();

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
    return <div className="flex items-center justify-center text-sm">No locales found.</div>;
  }

  return <NavigationList data={data} currentLocale={currentLocale} />;
}
