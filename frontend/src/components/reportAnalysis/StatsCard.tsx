import {
  CircleCheckBig,
  FlaskConical,
  Siren,
  TriangleAlert,
} from "lucide-react";

type Props = {
  title: string;
  value: number;
  subtitle: string;
  variant: "green" | "red" | "yellow" | "purple";
};

const config = {
  green: {
    chip: "bg-emerald-50 text-emerald-700",
    icon: CircleCheckBig,
  },
  red: {
    chip: "bg-red-50 text-red-700",
    icon: Siren,
  },
  yellow: {
    chip: "bg-amber-50 text-amber-700",
    icon: TriangleAlert,
  },
  purple: {
    chip: "bg-violet-50 text-violet-700",
    icon: FlaskConical,
  },
};

export default function StatsCard({
  title,
  value,
  subtitle,
  variant,
}: Props) {
  const current = config[variant];
  const Icon = current.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${current.chip}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${current.chip}`}
        >
          {subtitle}
        </span>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        {value ?? 0}
      </p>

      <p className="text-xs text-slate-500">{title}</p>
    </div>
  );
}
