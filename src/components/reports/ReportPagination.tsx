"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function ReportsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (totalPages <= 1) return null;

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
        Showing page{" "}
        <span className="font-medium text-slate-900">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-900">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2 overflow-x-auto">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="Previous page"
          className="
            flex
            h-9
            w-9
            shrink-0
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

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`
              h-9
              min-w-9
              shrink-0
              rounded-lg
              px-3
              text-sm
              font-semibold
              transition
              ${
                page === currentPage
                  ? "bg-cyan-600 text-white shadow-sm shadow-cyan-900/10"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="Next page"
          className="
            flex
            h-9
            w-9
            shrink-0
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
