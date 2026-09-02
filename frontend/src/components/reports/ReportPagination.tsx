"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  hasNextPage: boolean;
  showing: number;
}

export default function ReportsPagination({
  currentPage,
  hasNextPage,
  showing,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (currentPage === 1 && !hasNextPage) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));
    params.delete("welcome");

    router.push(`${pathname}?${params.toString()}`);
  };

  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-3">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900">{showing}</span> on page{" "}
        <span className="font-semibold text-slate-900">{currentPage}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          aria-label="Previous page"
          className={buttonClass}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          disabled={!hasNextPage}
          onClick={() => goToPage(currentPage + 1)}
          aria-label="Next page"
          className={buttonClass}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
