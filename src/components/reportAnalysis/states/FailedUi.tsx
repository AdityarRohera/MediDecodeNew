

"use client";

import { analyseReport } from "@/services/operations/reports/report";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FailedState({
  reportId,
}: {
  reportId: string;
}) {

  const [loading , setLoading] = useState(false)

  console.log("Inside Failed ui")

  const router = useRouter();

  const retryHandler = async () => {

  try {

    setLoading(true);

    await analyseReport(reportId);

    router.refresh();

  } catch (err) {

    console.log(err);

    router.refresh(); // reload status from DB

  } finally {

    setLoading(false);
  }
};

  return (
    <div className="flex min-h-125 items-center justify-center">

      <div className="text-center">

        <h1 className="text-2xl font-bold text-red-500">
          Analysis Failed
        </h1>

        <p className="mt-2">
          Something went wrong.
        </p>

        <button
  disabled={loading}
  onClick={retryHandler}
  className="mt-4 rounded bg-red-500 px-5 py-2 text-white"
>
  {loading ? "Retrying..." : "Retry Analysis"}
</button>

      </div>

    </div>
  );
}