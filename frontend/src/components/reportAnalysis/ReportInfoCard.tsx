import {
  FileText,
  Calendar,
  BadgeCheck,
  Microscope,
} from "lucide-react";

interface Props {
  reportName: string;
  reportType: string;
  uploadedAt: string;
  analyzedAt: string;
  totalTests: number;
  totalOrgans: number;
}

const formatDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

export default function ReportInfoCard({
  reportName,
  reportType,
  uploadedAt,
  analyzedAt,
  totalTests,
  totalOrgans,
}: Props) {
  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
    "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div
          className="
          h-10
          w-10
          rounded-xl
          bg-blue-50
          flex
          items-center
          justify-center
        "
        >
          <FileText className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Report Details
          </h2>

          <p className="text-xs text-slate-500">
            Uploaded document
          </p>
        </div>

      </div>

      {/* Report Name */}

      <div className="mt-4">

        <h3 className="text-sm font-semibold text-slate-900">
          {reportName}
        </h3>

      </div>

      {/* Metadata */}

      <div className="mt-4 space-y-3">

        <div className="flex items-center gap-3">
          <Microscope className="w-4 h-4 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">
              Report Type
            </p>

            <p className="text-sm font-medium">
              {reportType || "General"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">
              Uploaded
            </p>

            <p className="text-sm font-medium">
              {formatDate(uploadedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BadgeCheck className="w-4 h-4 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">
              Analyzed On
            </p>

            <p className="text-sm font-medium">
              {formatDate(analyzedAt)}
            </p>
          </div>
        </div>

      </div>

      {/* Divider */}

      <div className="h-px bg-slate-100 my-4" />

      {/* Quick Stats */}

      <div className="grid grid-cols-2 gap-3">

        <div
          className="
          bg-slate-50
          rounded-xl
          p-3
          text-center
        "
        >
          <p className="text-xl font-bold text-slate-900">
            {totalTests}
          </p>

          <p className="text-xs text-slate-500 mt-0.5">
            Tests
          </p>
        </div>

        <div
          className="
          bg-slate-50
          rounded-xl
          p-3
          text-center
        "
        >
          <p className="text-xl font-bold text-slate-900">
            {totalOrgans}
          </p>

          <p className="text-xs text-slate-500 mt-0.5">
            Organs
          </p>
        </div>

      </div>

    </div>
  );
}
