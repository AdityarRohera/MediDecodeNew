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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center shadow-md mb-4">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            Upload Your Medical Report
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl text-lg">
            Get AI-powered health insights from your lab reports with
            easy-to-understand analysis organized by organ systems.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Steps */}
          <div className="flex justify-center items-center gap-5 py-8 border-b bg-gray-50">
            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText size={18} />
              </div>
              Upload
            </div>

            <div className="w-12 h-0.5 bg-gray-300"></div>

            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                <Activity size={18} />
              </div>
              Processing
            </div>

            <div className="w-12 h-0.5 bg-gray-300"></div>

            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                <CheckCircle size={18} />
              </div>
              Results
            </div>
          </div>

          <div className="p-8 md:p-12">

            {/* Upload Area */}
            <div className="border-2 border-dashed border-blue-200 rounded-3xl p-12 bbg-linear-to-b from-blue-50 to-white flex flex-col items-center text-center transition hover:border-blue-400 hover:shadow-lg">

              {!file ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-5">
                    <Upload className="w-10 h-10 text-blue-600" />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800">
                    Drag & Drop Your Report
                  </h3>

                  <p className="text-gray-500 mt-2">
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
                    className="cursor-pointer mt-6 px-8 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition"
                  >
                    Browse Files
                  </label>
                </>
              ) : (
                <div className="w-full max-w-md">
                  <div className="bg-white border border-green-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-green-100">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>

                      <div className="text-left">
                        <p className="font-medium text-gray-900 truncate max-w-55">
                          {file.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={removeFile}
                      className="p-2 rounded-full hover:bg-red-50 transition"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    File ready for upload
                  </div>
                </div>
              )}
            </div>

            {file && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-medium transition"
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
                  className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
            <div className="mt-10 grid md:grid-cols-2 gap-8">

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  Supported Report Types
                </h2>

                <div className="space-y-4">
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
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Secure & Private
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  Your reports are processed securely. Uploaded files are
                  encrypted during analysis and are not stored permanently.
                </p>

                <div className="mt-5 bg-white rounded-xl p-4 border">
                  <div className="text-sm text-gray-500">
                    Supported Formats
                  </div>

                  <div className="flex gap-3 mt-3">
                    <span className="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-sm font-medium">
                      PDF
                    </span>

                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-sm font-medium">
                      PNG
                    </span>

                    <span className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 text-sm font-medium">
                      JPG
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-8 py-5 text-center text-sm text-gray-500">
            🔒 Your privacy is our priority. Reports are processed securely and
            removed after analysis.
          </div>
        </div>
      </div>
    </div>
  );
}