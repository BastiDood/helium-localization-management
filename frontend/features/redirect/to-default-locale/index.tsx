"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProjectLocales } from "@/lib/queries";

function Redirect({ project, locale }: { project: string; locale: string }) {
  const router = useRouter();
  useEffect(() => router.replace(`/dashboard/${project}/${locale}`), [project, locale, router]);
  return "Redirecting...";
}

export function RedirectToDefaultLocale({ id }: { id: string }) {
  const { data, isPending, isError } = useProjectLocales(id);
  if (isPending) return "Finding locales...";
  if (isError) return "Cannot find locales.";

  const [first] = data;
  return typeof first === "undefined" ? (
    "Get started by creating a locale."
  ) : (
    <Redirect project={first.project_id} locale={first.locale} />
  );
}
