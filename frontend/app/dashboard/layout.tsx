import Link from "next/link";

import { type ReactNode, useMemo } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <div className="flex flex-col min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-sans">
      <header className="bg-white dark:bg-stone-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-stone-700 dark:text-stone-200">
                Helium
              </span>
            </div>
          </div>
        </div>
      </header>
      {children}
      <footer className="bg-white dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-stone-500 dark:text-stone-400">
          <p>&copy; {year} Helium Contractor Assignment. Good luck!</p>
          <div className="mt-1">
            <Link
              href="https://github.com/BastiDood/helium-localization-management"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mx-2"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
