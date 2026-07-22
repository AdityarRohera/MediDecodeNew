"use client"
import { useAuth } from "@/context/AuthContext";
import { uploadReport } from "@/services/operations/reports/report";
import {
  Upload,
  FileText,
  CheckCircle,
  Activity,
  ShieldCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {

  const router = useRouter();
  const { user, loading } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // console.log("Getting file ------> ", file)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const analyzeReportHandler = async () => {
    try {
      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append("Report", file!);

      const uploadedFile = formData.get("Report");
      console.log(uploadedFile); 

      // call api here
      const response = await uploadReport(formData);
      console.log("Getting response -> " , response);

      router.push(`reports/${response?.data?.REPORT_ID}`)

    } catch (error) {
      console.log(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }

  }, [loading, user, router]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }


  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center shadow-sm mb-3">
            <Upload className="w-7 h-7 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Upload Your Medical Report
          </h1>

          <p className="text-slate-500 mt-2 max-w-xl text-sm">
            Get AI-powered health insights organized by organ systems.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Steps */}
          <div className="flex justify-center items-center gap-4 py-4 border-b bg-slate-50">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText size={15} />
              </div>
              Upload
            </div>

            <div className="w-8 h-0.5 bg-slate-300"></div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                <Activity size={15} />
              </div>
              Processing
            </div>

            <div className="w-8 h-0.5 bg-slate-300"></div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                <CheckCircle size={15} />
              </div>
              Results
            </div>
          </div>

          <div className="p-6 md:p-8">

            {/* Upload Area */}
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 bg-linear-to-b from-blue-50 to-white flex flex-col items-center text-center transition hover:border-blue-400">

              {!file ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                    <Upload className="w-7 h-7 text-blue-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    Drag & Drop Your Report
                  </h3>

                  <p className="text-slate-500 mt-1 text-sm">
                    Upload PDF, PNG or JPG files up to 10MB
                  </p>

                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={changeHandler}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />

                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 transition"
                  >
                    Browse Files
                  </label>
                </>
              ) : (
                <div className="w-full max-w-md">
                  <div className="bg-white border border-green-200 rounded-2xl p-3.5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-green-100">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>

                      <div className="text-left">
                        <p className="font-medium text-slate-900 truncate max-w-55 text-sm">
                          {file.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={removeFile}
                      className="p-2 rounded-full hover:bg-red-50 transition"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2 text-green-600 font-medium text-sm">
                    <CheckCircle className="w-4 h-4" />
                    File ready for upload
                  </div>
                </div>
              )}
            </div>

            {file && (
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium transition"
                >
                  Change File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={changeHandler}
                  accept=".pdf,.png,.jpg,.jpeg"
                />

                <button
                  onClick={analyzeReportHandler}
                  disabled={isAnalyzing}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    "Analyze Report"
                  )}
                </button>
              </div>
            )}

            {/* Supported Reports */}
            <div className="mt-6 grid md:grid-cols-2 gap-5">

              <div>
                <h2 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                  Supported Report Types
                </h2>

                <div className="space-y-2">
                  {[
                    "Complete Blood Count (CBC)",
                    "Comprehensive Metabolic Panel (CMP)",
                    "Lipid Profile",
                    "Liver Function Tests",
                    "Thyroid Function Tests",
                    "Kidney Function Tests",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Secure & Private
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Your files are encrypted during analysis and are not stored permanently.
                </p>

                <div className="mt-3 bg-white rounded-xl p-3 border">
                  <div className="text-xs text-slate-500">
                    Supported Formats
                  </div>

                  <div className="flex gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-600 text-xs font-medium">
                      PDF
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-medium">
                      PNG
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-yellow-100 text-yellow-700 text-xs font-medium">
                      JPG
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t px-6 py-3 text-center text-xs text-slate-500">
            Your privacy is our priority. Reports are processed securely and removed after analysis.
          </div>
        </div>
      </div>
    </div>
  );
}