"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  hasNextPage: boolean;
}

export default function ReportsPagination({
  currentPage,
  hasNextPage,
}: Props) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (currentPage === 1 && !hasNextPage) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-slate-200
        bg-white
        px-5
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <p className="text-sm text-slate-500">
        Page{" "}
        <span className="font-medium text-slate-900">
          {currentPage}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          aria-label="Previous page"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-600
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-45
        "
        >
          <ChevronLeft size={18} />
        </button>

        <button
          disabled={!hasNextPage}
          onClick={() => goToPage(currentPage + 1)}
          aria-label="Next page"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-600
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-45
        "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
