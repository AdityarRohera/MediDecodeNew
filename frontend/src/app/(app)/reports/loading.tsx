import Skeleton from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[102px]" />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3.5">
          <Skeleton className="h-5 w-56" />
        </div>

        <div className="border-b border-slate-200 px-5 py-3">
          <Skeleton className="h-10 w-full max-w-md" />
        </div>

        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 px-5 py-4">
              <Skeleton className="h-10 w-10 rounded-xl" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-20" />
              </div>

              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
