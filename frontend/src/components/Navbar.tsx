import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 text-white shadow-lg shadow-blue-500/20">
            <ShieldOutlinedIcon />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Security Audit Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Monitor and investigate audit logs in real time
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;