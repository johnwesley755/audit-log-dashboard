import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

interface NavbarProps {
  onUploadClick: () => void;
}

const Navbar = ({ onUploadClick }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <ShieldOutlinedIcon />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Security Audit Dashboard
            </h1>

            <p className="text-xs text-slate-500">
              Monitor and investigate audit logs
            </p>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <CloudUploadOutlinedIcon fontSize="small" />
          Upload Logs
        </button>
      </div>
    </header>
  );
};

export default Navbar;