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
      rounded-2xl
      p-5
      shadow-sm
    "
    >
      <h2 className="text-sm font-semibold text-slate-900">
        Quick Actions
      </h2>

      <p className="text-xs text-slate-500 mt-1">
        Manage and export your report
      </p>

      <div className="grid grid-cols-2 gap-2.5 mt-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="
              group
              p-3
              rounded-xl
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
                h-9
                w-9
                rounded-lg
                bg-slate-100
                flex
                items-center
                justify-center
                group-hover:bg-white
                transition-colors
              "
              >
                <Icon
                  size={16}
                  className="text-slate-700"
                />
              </div>

              <p className="mt-2 text-sm font-medium text-slate-900">
                {action.label}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}