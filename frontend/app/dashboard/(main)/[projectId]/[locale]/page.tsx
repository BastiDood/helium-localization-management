import { Editor } from "@/features/editor";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ projectId: string; locale: string }>;
}>) {
  const { projectId, locale } = await params;
  return <Editor projectId={projectId} locale={locale} />;
}
