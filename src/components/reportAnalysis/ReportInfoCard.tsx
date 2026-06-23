import {
  FileText,
  Calendar,
  Database,
  Microscope,
} from "lucide-react";

interface Props {
  reportName: string;
  reportType: string;
  fileSize: string;
  uploadedAt: string;
  totalTests: number;
  totalOrgans: number;
}

export default function ReportInfoCard({
  reportName,
  reportType,
  fileSize,
  uploadedAt,
  totalTests,
  totalOrgans,
}: Props) {
  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
    "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div
          className="
          h-11
          w-11
          rounded-2xl
          bg-blue-50
          flex
          items-center
          justify-center
        "
        >
          <FileText className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">
            Report Details
          </h2>

          <p className="text-sm text-slate-500">
            Uploaded document
          </p>
        </div>

      </div>

      {/* Report Name */}

      <div className="mt-6">

        <h3 className="font-semibold text-slate-900">
          {reportName}
        </h3>

      </div>

      {/* Metadata */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">
          <Microscope className="w-4 h-4 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">
              Report Type
            </p>

            <p className="text-sm font-medium">
              {reportType}
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
              {uploadedAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Database className="w-4 h-4 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">
              File Size
            </p>

            <p className="text-sm font-medium">
              {fileSize}
            </p>
          </div>
        </div>

      </div>

      {/* Divider */}

      <div className="h-px bg-slate-100 my-6" />

      {/* Quick Stats */}

      <div className="grid grid-cols-2 gap-3">

        <div
          className="
          bg-slate-50
          rounded-2xl
          p-4
          text-center
        "
        >
          <p className="text-2xl font-bold text-slate-900">
            {totalTests}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Tests
          </p>
        </div>

        <div
          className="
          bg-slate-50
          rounded-2xl
          p-4
          text-center
        "
        >
          <p className="text-2xl font-bold text-slate-900">
            {totalOrgans}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Organs
          </p>
        </div>

      </div>

    </div>
  );
}