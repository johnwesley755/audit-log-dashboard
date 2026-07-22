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
    "rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-blue-500";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <select
        value={filters.severity}
        onChange={(e) => updateFilter("severity", e.target.value)}
        className={selectStyle}
      >
        <option value="">Severity</option>
        <option>HIGH</option>
        <option>MEDIUM</option>
        <option>LOW</option>
      </select>

      <select
        value={filters.role}
        onChange={(e) => updateFilter("role", e.target.value)}
        className={selectStyle}
      >
        <option value="">Role</option>
        <option>admin</option>
        <option>developer</option>
        <option>user</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => updateFilter("status", e.target.value)}
        className={selectStyle}
      >
        <option value="">Status</option>
        <option>Resolved</option>
        <option>Unresolved</option>
      </select>

      <select
        value={filters.region}
        onChange={(e) => updateFilter("region", e.target.value)}
        className={selectStyle}
      >
        <option value="">Region</option>
        <option>ap-south-1</option>
        <option>us-east-1</option>
        <option>eu-west-1</option>
      </select>
    </div>
  );
};

export default FilterPanel;