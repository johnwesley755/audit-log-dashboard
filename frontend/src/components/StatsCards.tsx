import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import type { DashboardStats } from "../types/AuditLog";

interface Props {
  stats: DashboardStats;
}

const StatsCards = ({ stats }: Props) => {
  const cards = [
    {
      title: "Total Logs",
      value: stats.totalLogs,
      icon: <SecurityOutlinedIcon />,
      accent: "from-blue-600 to-cyan-500",
      text: "All captured activity",
    },
    {
      title: "High",
      value: stats.high,
      icon: <ReportProblemOutlinedIcon />,
      accent: "from-red-500 to-rose-500",
      text: "Critical severity",
    },
    {
      title: "Medium",
      value: stats.medium,
      icon: <ErrorOutlineOutlinedIcon />,
      accent: "from-amber-500 to-yellow-400",
      text: "Needs review",
    },
    {
      title: "Low",
      value: stats.low,
      icon: <CheckCircleOutlineOutlinedIcon />,
      accent: "from-emerald-500 to-green-500",
      text: "Routine activity",
    },
    {
      title: "Unresolved",
      value: stats.unresolved,
      icon: <ReportProblemOutlinedIcon />,
      accent: "from-violet-600 to-purple-500",
      text: "Open incidents",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-[22px] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</h2>
              <p className="mt-2 text-xs text-slate-500">{card.text}</p>
            </div>
            <div className={`rounded-2xl bg-gradient-to-br ${card.accent} p-3 text-white shadow-lg`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;