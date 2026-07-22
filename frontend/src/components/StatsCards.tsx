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
      color: "bg-blue-500",
      icon: <SecurityOutlinedIcon />,
    },
    {
      title: "High",
      value: stats.high,
      color: "bg-red-500",
      icon: <ReportProblemOutlinedIcon />,
    },
    {
      title: "Medium",
      value: stats.medium,
      color: "bg-yellow-500",
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Low",
      value: stats.low,
      color: "bg-green-500",
      icon: <CheckCircleOutlineOutlinedIcon />,
    },
    {
      title: "Unresolved",
      value: stats.unresolved,
      color: "bg-purple-500",
      icon: <ReportProblemOutlinedIcon />,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>

              <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
            </div>

            <div className={`${card.color} rounded-lg p-3 text-white`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;