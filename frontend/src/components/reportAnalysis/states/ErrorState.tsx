import { AlertCircle } from "lucide-react";

export default function ErrorState({
  title,
}: {
  title: string;
}) {

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="mt-6 text-xl font-semibold text-slate-900">
          Error
        </h1>

        <p className="mt-2 text-slate-500">
          {title}
        </p>

      </div>

    </div>
  );
}
