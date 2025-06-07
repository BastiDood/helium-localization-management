import { RedirectToDefaultLocale } from "@/features/redirect/to-default-locale";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ projectId: string }> }>) {
  const { projectId } = await params;
  return <RedirectToDefaultLocale id={projectId} />;
}
