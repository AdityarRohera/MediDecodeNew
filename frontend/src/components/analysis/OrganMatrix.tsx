import { OrganMatrixRow } from "@/data/analysisData";
import SampleBadge from "./SampleBadge";
import { statusStyle, TestStatus } from "./shared";

type Props = {
  columns: string[];
  rows: OrganMatrixRow[];
};

const legend: TestStatus[] = ["NORMAL", "BORDERLINE", "CRITICAL"];

export default function OrganMatrix({ columns, rows }: Props) {
  return (
    <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Organ health over time
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Each dot is one report, oldest on the left.
          </p>
        </div>

        <SampleBadge />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[320px] table-fixed">
          <thead>
            <tr>
              <th className="w-28" />

              {columns.map((column) => (
                <th
                  key={column}
                  className="pb-2 text-center text-xs font-medium text-slate-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.organName} className="hover:bg-slate-50">
                <td className="rounded-l-lg py-2 pl-2 text-sm text-slate-600">
                  {row.organName}
                </td>

                {row.statuses.map((status, index) => (
                  <td key={index} className="py-2 text-center">
                    <span
                      title={statusStyle[status].label}
                      className={`inline-block h-3.5 w-3.5 rounded-full ring-4 ring-white ${statusStyle[status].dot}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3">
        {legend.map((status) => (
          <span
            key={status}
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${statusStyle[status].dot}`}
            />
            {statusStyle[status].label}
          </span>
        ))}
      </div>
    </section>
  );
}
