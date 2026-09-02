import Skeleton from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-52" />

      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}
