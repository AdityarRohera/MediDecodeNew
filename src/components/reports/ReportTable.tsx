import { HealthScoreBadge } from "./HealthScore";
import { ReportStatus, StatusBadge } from "./StatusBadge";

type Report = {
  id: string;
  name: string;
  type: string;
  date: string;
  score: number;
  status: ReportStatus;
};

// const reports: Report[] = [
//   {
//     id: "CBC-2026-0528",
//     name: "Complete Blood Count",
//     type: "Hematology",
//     date: "May 28, 2026",
//     score: 86,
//     status: "GOOD",
//   },
//   {
//     id: "LFT-2026-0521",
//     name: "Liver Function Panel",
//     type: "Biochemistry",
//     date: "May 21, 2026",
//     score: 74,
//     status: "ATTENTION",
//   },
//   {
//     id: "LIP-2026-0507",
//     name: "Lipid Profile",
//     type: "Cardiology",
//     date: "May 7, 2026",
//     score: 91,
//     status: "GOOD",
//   },
//   {
//     id: "THY-2026-0429",
//     name: "Thyroid Profile",
//     type: "Endocrinology",
//     date: "Apr 29, 2026",
//     score: 68,
//     status: "CRITICAL",
//   },
// ];

export default function ReportTable({reports} : any) {
  return (
    <div className="overflow-x-auto bg-white">

      <table className="w-full min-w-190 text-left">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr className="border-b border-slate-200">
            <th className="px-5 py-3">Report</th>
            <th className="px-5 py-3">Type</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Score</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-sm">
          {reports.map((report : any) => (

            <tr key={report.REPORT_ID} className="transition hover:bg-slate-50/80">
              <td className="px-5 py-4">
                <div className="font-semibold text-slate-950">{report.REPORT_NAME || "REPORT_NAME"}</div>
                <div className="mt-1 text-xs text-slate-500">{report.REPORT_ID.substring(0 , 8)}</div>
              </td>
              <td className="px-5 py-4 text-slate-600">{report.REPORT_TYPE || "REPORT_TYPE"}</td>
              <td className="px-5 py-4 text-slate-600">{report.UPLOADED_DATE.substring(0,10)}</td>
              <td className="px-5 py-4">
                <HealthScoreBadge score={report.HEALTH_SCORE || 50} />
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={report.HEALTH_STATUS || 'GOOD'} />
              </td>
              <td className="px-5 py-4 text-right">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700">
                  View Analysis
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
