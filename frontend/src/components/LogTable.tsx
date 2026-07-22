import DeleteIcon from "@mui/icons-material/Delete";
import type { AuditLog } from "../types/AuditLog";
import dayjs from "dayjs";

interface Props {
  logs: AuditLog[];
  loading: boolean;
  sortBy: string;
  order: "asc" | "desc";
  onSort: (column: string) => void;
  onDeleteOne: (id: string) => void;
  onDeleteAll: () => void;
}

const severityColor = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-emerald-100 text-emerald-700",
};

const statusColor = {
  Resolved: "bg-emerald-100 text-emerald-700",
  Unresolved: "bg-rose-100 text-rose-700",
};

const LogTable = ({ logs, loading, sortBy, order, onSort, onDeleteOne, onDeleteAll }: Props) => {
  const columns = [
    { key: "actor", label: "Actor" },
    { key: "role", label: "Role" },
    { key: "action", label: "Action" },
    { key: "resourceType", label: "Resource" },
    { key: "severity", label: "Severity" },
    { key: "status", label: "Status" },
    { key: "region", label: "Region" },
    { key: "timestamp", label: "Timestamp" },
  ];

  if (loading) {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
        Loading logs...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Recent audit events</h3>
          <p className="text-sm text-slate-500">Browse the latest security actions and status updates.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
            {logs.length} entries visible
          </div>
          <button
            onClick={onDeleteAll}
            className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            <DeleteIcon fontSize="small" />
            Delete All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => onSort(column.key)}
                  className="cursor-pointer px-5 py-4 text-left font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {column.label}
                  {sortBy === column.key && (order === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
              <th className="px-5 py-4 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  No logs found for the current filters.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-b border-slate-100 transition hover:bg-slate-50">
                  <td className="px-5 py-4">{log.actor}</td>
                  <td className="px-5 py-4 capitalize">{log.role}</td>
                  <td className="px-5 py-4">{log.action}</td>
                  <td className="px-5 py-4">{log.resourceType}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityColor[log.severity]}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[log.status]}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">{log.region}</td>
                  <td className="whitespace-nowrap px-5 py-4">{dayjs(log.timestamp).format("DD MMM YYYY HH:mm")}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => onDeleteOne(log._id)}
                      className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100"
                      aria-label={`Delete ${log.actor}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogTable;