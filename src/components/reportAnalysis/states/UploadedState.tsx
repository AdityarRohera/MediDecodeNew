

  "use client";

  import { useEffect } from "react";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import { analyseReport } from "@/services/operations/reports/report";

  export default function UploadedState({
    reportId,
  }: {
    reportId: string;
  }) {

    const router = useRouter();

    useEffect(() => {

      const startAnalysis = async () => {

        try {

          console.log("STating anaylising *********************8888");

          const response = await analyseReport(reportId);
          
          console.log("Getting response inside uploaded state ------------>  " , response)

          router.refresh();

        } catch (error) {
          console.log(error);
        }
      };

      startAnalysis();

    }, [reportId]);

    return (
      <div className="flex min-h-[500px] items-center justify-center">

        <div className="text-center">

          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto" />

          <h1 className="mt-4 text-2xl font-bold">
            Starting Analysis...
          </h1>

          <p className="mt-2">
            Preparing your report
          </p>

        </div>

      </div>
    );
  }