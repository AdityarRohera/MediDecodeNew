

import {
  Download,
  Share2,
  GitCompare,
  FileText,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    title: "Download Report",
    icon: Download,
  },
  {
    title: "Share Report",
    icon: Share2,
  },
  {
    title: "Compare Report",
    icon: GitCompare,
  },
  {
    title: "Add Note",
    icon: FileText,
  },
];

export default function ActionsCard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.04)] p-7">

      <h2 className="text-xl font-semibold mb-6">
        Actions
      </h2>

      <div className="space-y-3">

        {actions.map((item) => (
          <button
            key={item.title}
            className="
            w-full
            flex
            items-center
            justify-between
            border
            border-slate-200
            rounded-2xl
            px-5
            py-4
            hover:shadow-md
            transition-all
            "
          >
            <div className="flex items-center gap-3">
              <item.icon
                size={18}
                className="text-slate-500"
              />

              <span className="font-medium">
                {item.title}
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-slate-400"
            />
          </button>
        ))}

      </div>

    </div>
  );
}