import { useEffect, useState } from "react";
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

  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    totalLogs: 0,
    high: 0,
    medium: 0,
    low: 0,
    resolved: 0,
    unresolved: 0,
  });

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState("timestamp");

  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [filters, setFilters] = useState({
    severity: "",
    role: "",
    status: "",
    region: "",
  });

  useEffect(() => {

    fetchLogs();

  }, [page, search, filters, sortBy, order]);

  useEffect(() => {

    fetchStats();

  }, []);

  async function fetchLogs() {

    try {

      setLoading(true);

      const { data } = await api.get("/logs", {
        params: {
          page,
          search,
          sortBy,
          order,
          ...filters,
        },
      });

      setLogs(data.logs);

      setTotalPages(data.totalPages);

    } finally {

      setLoading(false);

    }
  }

  async function fetchStats() {

    const { data } = await api.get("/logs/stats");

    setStats(data);
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
    <div className="min-h-screen bg-slate-100">

      <Navbar onUploadClick={() => {}} />

      <div className="mx-auto max-w-7xl space-y-6 p-6">

        <StatsCards stats={stats} />

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:justify-between">

            <div className="lg:w-1/2">
              <SearchBar search={search} setSearch={setSearch} />
            </div>

            <UploadLogs />

          </div>

          <FilterPanel
            filters={filters}
            setFilters={setFilters}
          />

        </div>

        <LogTable
          logs={logs}
          loading={loading}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>

    </div>
  );

}