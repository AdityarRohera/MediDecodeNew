import {
  FlaskConical,
  CircleCheckBig,
  TriangleAlert,
  Siren,
} from "lucide-react";

type Props = {
  title: string;
  value: number;
  subtitle: string;
  variant: "green" | "red" | "yellow" | "purple";
};

export default function StatsCard({
  title,
  value,
  subtitle,
  variant,
}: Props) {
  
  const config = {
    green: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: CircleCheckBig,
    },

    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      icon: Siren,
    },

    yellow: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      icon: TriangleAlert,
    },

    purple: {
      bg: "bg-violet-50",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      icon: FlaskConical,
    },
  };

  const current = config[variant];
  const Icon = current.icon;

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-5
      transition-all
      duration-300
      hover:shadow-lg
      hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`
          h-12 w-12
          rounded-2xl
          flex items-center justify-center
          ${current.iconBg}
        `}
        >
          <Icon
            className={`h-6 w-6 ${current.iconColor}`}
          />
        </div>

        <span
          className={`
          text-xs
          font-medium
          px-2.5 py-1
          rounded-full
          ${current.bg}
          ${current.iconColor}
        `}
        >
          {subtitle}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-slate-900 mt-1">
          {value}
        </h2>
      </div>
    </div>
  );
}