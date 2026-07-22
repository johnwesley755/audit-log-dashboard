import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api/api";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import UploadLogs from "../components/UploadLogs";
import LogTable from "../components/LogTable";
import Pagination from "../components/Pagination";

import type { AuditLog, DashboardStats } from "../types/AuditLog";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("timestamp");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    severity: "",
    role: "",
    status: "",
    region: "",
  });
  const [summary, setSummary] = useState("Monitoring secure activity across your environment.");

  const queryParams = useMemo(
    () => ({ page, search, sortBy, order, ...filters }),
    [page, search, sortBy, order, filters]
  );

  const {
    data: logsData,
    isLoading: loading,
  } = useQuery({
    queryKey: ["logs", queryParams],
    queryFn: async () => {
      const { data } = await api.get("/logs", { params: queryParams });
      return data;
    },
    staleTime: 30_000,
  });

  const { data: statsData } = useQuery<DashboardStats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await api.get("/logs/stats");
      return data;
    },
    staleTime: 30_000,
  });

  const logs = logsData?.logs ?? [];
  const stats = statsData ?? {
    totalLogs: 0,
    high: 0,
    medium: 0,
    low: 0,
    resolved: 0,
    unresolved: 0,
  };
  const totalPages = logsData?.totalPages ?? 1;

  const refreshDashboard = () => {
    void queryClient.invalidateQueries({ queryKey: ["logs"] });
    void queryClient.invalidateQueries({ queryKey: ["stats"] });
  };

  const summaryText = useMemo(() => {
    if (stats.totalLogs > 0) {
      const resolutionRate = Math.round((stats.resolved / stats.totalLogs) * 100);
      return `Resolution rate is ${resolutionRate}% across ${stats.totalLogs} audit entries.`;
    }

    return summary;
  }, [stats, summary]);

  async function handleDeleteOne(id: string) {
    try {
      await api.delete(`/logs/${id}`);
      toast.success("Log deleted successfully");
      refreshDashboard();
    } catch (error) {
      toast.error("Failed to delete log");
    }
  }

  async function handleDeleteAll() {
    try {
      await api.delete("/logs/all");
      toast.success("All logs deleted successfully");
      refreshDashboard();
    } catch (error) {
      toast.error("Failed to delete logs");
    }
  }

  function handleSort(column: string) {
    if (column === sortBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6 text-white shadow-2xl shadow-slate-900/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                Live audit intelligence
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Security operations dashboard
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                Review audit activity, investigate critical events, and stay ahead of unresolved issues with a focused operational view.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Current snapshot</p>
              <p className="mt-2 max-w-md text-sm font-medium text-slate-100">{summaryText}</p>
            </div>
          </div>
        </section>

        <StatsCards stats={stats} />

        <div className="rounded-[24px] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:w-[60%]">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <UploadLogs onUploadSuccess={refreshDashboard} />
          </div>

          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        <LogTable
          logs={logs}
          loading={loading}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
          onDeleteOne={handleDeleteOne}
          onDeleteAll={handleDeleteAll}
        />

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}