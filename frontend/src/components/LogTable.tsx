import type { AuditLog } from "../types/AuditLog";
import dayjs from "dayjs";

interface Props {
  logs: AuditLog[];
  loading: boolean;
  sortBy: string;
  order: "asc" | "desc";
  onSort: (column: string) => void;
}

const severityColor = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

const statusColor = {
  Resolved: "bg-green-100 text-green-700",
  Unresolved: "bg-red-100 text-red-700",
};

const LogTable = ({
  logs,
  loading,
  sortBy,
  order,
  onSort,
}: Props) => {
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
      <div className="rounded-xl bg-white p-10 text-center">
        Loading logs...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-slate-100">

            <tr>

              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => onSort(column.key)}
                  className="cursor-pointer px-5 py-4 text-left font-semibold text-slate-700 hover:bg-slate-200"
                >
                  {column.label}

                  {sortBy === column.key &&
                    (order === "asc" ? " ↑" : " ↓")}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-slate-500"
                >
                  No logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-5 py-4">{log.actor}</td>

                  <td className="px-5 py-4 capitalize">
                    {log.role}
                  </td>

                  <td className="px-5 py-4">
                    {log.action}
                  </td>

                  <td className="px-5 py-4">
                    {log.resourceType}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        severityColor[log.severity]
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColor[log.status]
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {log.region}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    {dayjs(log.timestamp).format(
                      "DD MMM YYYY HH:mm"
                    )}
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