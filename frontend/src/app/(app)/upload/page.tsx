"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Upload,
  X,
} from "lucide-react";

import { uploadReport } from "@/services/operations/reports/report";

const ACCEPTED = [".pdf", ".png", ".jpg", ".jpeg"];
const MAX_SIZE_MB = 10;

const supportedReports = [
  "Complete Blood Count (CBC)",
  "Comprehensive Metabolic Panel",
  "Lipid profile",
  "Liver function tests",
  "Thyroid function tests",
  "Kidney function tests",
];

const steps = [
  { label: "Choose file", icon: FileText },
  { label: "Analyze", icon: Sparkles },
  { label: "Results", icon: CheckCircle2 },
];

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // Current step drives the progress rail at the top of the card.
  const activeStep = isAnalyzing ? 1 : file ? 0 : 0;

  const acceptFile = (selected?: File | null) => {
    if (!selected) return;

    const extension = selected.name
      .slice(selected.name.lastIndexOf("."))
      .toLowerCase();

    if (!ACCEPTED.includes(extension)) {
      setError("That file type is not supported. Use a PDF, PNG or JPG.");
      return;
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`That file is larger than ${MAX_SIZE_MB} MB.`);
      return;
    }

    setError("");
    setFile(selected);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(e.target.files?.[0]);

    // Reset so picking the same file twice still fires a change.
    e.target.value = "";
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    acceptFile(e.dataTransfer.files?.[0]);
  };

  const analyzeReportHandler = async () => {
    if (!file) return;

    try {
      setIsAnalyzing(true);
      setError("");

      const formData = new FormData();
      formData.append("Report", file);

      const response = await uploadReport(formData);

      router.push(`/reports/${response?.data?.REPORT_ID}`);
    } catch (err: any) {
      console.log("Error comes in upload report ---->", err);

      setError(
        err?.response?.data?.message ||
          "We could not upload this report. Please try again."
      );

      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.6fr_1fr]">
      {/* Uploader */}
      <section className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const active = index === activeStep;
            const done = index < activeStep;

            return (
              <div key={step.label} className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`flex items-center gap-2 text-xs font-semibold sm:text-sm ${
                    active || done ? "text-brand-700" : "text-slate-400"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                      active
                        ? "bg-brand-600 text-white"
                        : done
                        ? "bg-brand-100 text-brand-700"
                        : "border border-slate-200 text-slate-400"
                    }`}
                  >
                    <Icon size={15} />
                  </span>

                  <span className="hidden sm:inline">{step.label}</span>
                </div>

                {index < steps.length - 1 && (
                  <span className="h-px w-6 bg-slate-200 sm:w-10" />
                )}
              </div>
            );
          })}
        </div>

        <div className="p-5 sm:p-6">
          {error && (
            <div className="mb-4 flex animate-fade-down items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
              <TriangleAlert size={17} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={dropHandler}
            className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
              dragging
                ? "border-brand-500 bg-brand-50"
                : "border-slate-200 bg-slate-50/70"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={changeHandler}
              accept={ACCEPTED.join(",")}
            />

            {!file ? (
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition ${
                    dragging ? "scale-110" : ""
                  }`}
                >
                  <Upload className="h-6 w-6 text-brand-600" />
                </span>

                <h2 className="mt-4 text-base font-semibold text-slate-900">
                  Drag and drop your report
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  PDF, PNG or JPG, up to {MAX_SIZE_MB} MB
                </p>

                <button
                  onClick={() => inputRef.current?.click()}
                  className="mt-5 inline-flex h-11 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98]"
                >
                  Browse files
                </button>
              </div>
            ) : (
              <div className="mx-auto max-w-md animate-scale-in">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white p-3.5 text-left">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {formatSize(file.size)}
                    </p>
                  </div>

                  {!isAnalyzing && (
                    <button
                      onClick={() => setFile(null)}
                      aria-label="Remove file"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {isAnalyzing ? (
                  <div className="mt-4">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-1/3 animate-[shimmer_1.4s_linear_infinite] rounded-full bg-linear-to-r from-brand-400 via-brand-600 to-brand-400 bg-[length:200%_100%]" />
                    </div>

                    <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-brand-700">
                      <Loader2 size={16} className="animate-spin" />
                      Uploading and starting analysis...
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Change file
                    </button>

                    <button
                      onClick={analyzeReportHandler}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98]"
                    >
                      <Sparkles size={16} />
                      Analyze report
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {supportedReports.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-700"
              >
                <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-center text-xs text-slate-500">
          Reports are processed securely and are only visible to your account.
        </p>
      </section>

      {/* Side rail */}
      <aside
        className="animate-fade-up space-y-4"
        style={{ animationDelay: "80ms" }}
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Sparkles size={16} className="text-brand-600" />
            What happens next
          </h2>

          <ol className="mt-4 space-y-4">
            {[
              "We read every test, unit and reference range from the file.",
              "Each result is grouped by organ system and marked normal, borderline or critical.",
              "You get a health score, a summary and answers to any question about the report.",
            ].map((text, index) => (
              <li key={text} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                  {index + 1}
                </span>

                <p className="text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ShieldCheck size={16} className="text-brand-600" />
            Secure and private
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Files are sent over an encrypted connection and linked only to your
            account. Nobody else can open your reports.
          </p>

          <div className="mt-4 rounded-xl border border-white bg-white p-3">
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <Lock size={13} />
              Accepted formats
            </p>

            <div className="mt-2 flex gap-2">
              <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                PDF
              </span>

              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                PNG
              </span>

              <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                JPG
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
