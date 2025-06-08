import { RedirectToDefaultProject } from "@/features/redirect/to-default-project";

export default function Page() {
  return (
    <div className="bg-white dark:bg-stone-800 shadow rounded-lg p-4 w-full flex items-center justify-center">
      <RedirectToDefaultProject />
    </div>
  );
}
