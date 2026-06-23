import {
  Download,
  Share2,
  BarChart3,
  FilePenLine,
} from "lucide-react";

const actions = [
  {
    label: "Download",
    icon: Download,
  },
  {
    label: "Share",
    icon: Share2,
  },
  {
    label: "Compare",
    icon: BarChart3,
  },
  {
    label: "Notes",
    icon: FilePenLine,
  },
];

export default function ActionsCard() {
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
      <h2 className="font-semibold text-slate-900">
        Quick Actions
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Manage and export your report
      </p>

      <div className="grid grid-cols-2 gap-3 mt-6">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="
              group
              p-4
              rounded-2xl
              border
              border-slate-200
              hover:border-blue-200
              hover:bg-blue-50
              transition-all
              duration-200
              text-left
            "
            >
              <div
                className="
                h-10
                w-10
                rounded-xl
                bg-slate-100
                flex
                items-center
                justify-center
                group-hover:bg-white
                transition-colors
              "
              >
                <Icon
                  size={18}
                  className="text-slate-700"
                />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-900">
                {action.label}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}