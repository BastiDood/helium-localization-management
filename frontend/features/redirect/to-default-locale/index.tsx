"use client";

import { CircleX, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProjectLocales } from "@/lib/queries";

function Redirect({ project, locale }: { project: string; locale: string }) {
  const router = useRouter();
  useEffect(() => router.replace(`/dashboard/${project}/${locale}`), [project, locale, router]);
  return <Loader2 className="animate-spin" />;
}

export function RedirectToDefaultLocale({ id }: { id: string }) {
  const { data, isPending, isError } = useProjectLocales(id);
  if (isPending) return <Loader2 className="animate-spin" />;
  if (isError) return <CircleX />;

  const [first] = data;
  return typeof first === "undefined" ? (
    "Get started by creating a locale."
  ) : (
    <Redirect project={first.project_id} locale={first.locale} />
  );
}
