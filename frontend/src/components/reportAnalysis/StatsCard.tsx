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
      rounded-2xl
      p-4
      transition-all
      duration-300
      hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`
          h-10 w-10
          rounded-xl
          flex items-center justify-center
          ${current.iconBg}
        `}
        >
          <Icon
            className={`h-5 w-5 ${current.iconColor}`}
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

      <div className="mt-4">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-0.5">
          {value}
        </h2>
      </div>
    </div>
  );
}