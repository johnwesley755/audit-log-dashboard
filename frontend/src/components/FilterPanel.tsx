interface FilterProps {
  filters: {
    severity: string;
    role: string;
    status: string;
    region: string;
  };

  setFilters: React.Dispatch<
    React.SetStateAction<{
      severity: string;
      role: string;
      status: string;
      region: string;
    }>
  >;
}

const FilterPanel = ({ filters, setFilters }: FilterProps) => {
  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectStyle =
    "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Severity</label>
        <select value={filters.severity} onChange={(e) => updateFilter("severity", e.target.value)} className={selectStyle}>
          <option value="">All severities</option>
          <option>HIGH</option>
          <option>MEDIUM</option>
          <option>LOW</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Role</label>
        <select value={filters.role} onChange={(e) => updateFilter("role", e.target.value)} className={selectStyle}>
          <option value="">Any role</option>
          <option>admin</option>
          <option>developer</option>
          <option>user</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Status</label>
        <select value={filters.status} onChange={(e) => updateFilter("status", e.target.value)} className={selectStyle}>
          <option value="">Any status</option>
          <option>Resolved</option>
          <option>Unresolved</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Region</label>
        <select value={filters.region} onChange={(e) => updateFilter("region", e.target.value)} className={selectStyle}>
          <option value="">All regions</option>
          <option>ap-south-1</option>
          <option>us-east-1</option>
          <option>eu-west-1</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;