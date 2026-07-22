import { FileQuestion } from "lucide-react";

export default function NotFoundState() {

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <FileQuestion className="h-8 w-8 text-slate-500" />
        </div>

        <h1 className="mt-6 text-xl font-semibold text-slate-900">
          Report Not Found
        </h1>

        <p className="mt-2 text-slate-500">
          The requested report does not exist.
        </p>

      </div>

    </div>
  );
}
