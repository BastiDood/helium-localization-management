import { RedirectToDefaultLocale } from "@/features/redirect/to-default-locale";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ projectId: string }> }>) {
  const { projectId } = await params;
  return (
    <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-4 w-full flex items-center justify-center">
      <RedirectToDefaultLocale id={projectId} />
    </div>
  );
}
