import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import api from "../api/api";
import { toast } from "react-toastify";

interface UploadLogsProps {
  onUploadSuccess: () => void;
}

const UploadLogs = ({ onUploadSuccess }: UploadLogsProps) => {
  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();
      const logs = JSON.parse(text);

      await api.post("/logs/upload", logs);
      toast.success(`${logs.length} logs uploaded successfully`);
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Please check the JSON format.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:from-blue-700 hover:to-cyan-600">
      <CloudUploadOutlinedIcon />
      Upload JSON
      <input type="file" accept=".json" hidden onChange={uploadFile} />
    </label>
  );
};

export default UploadLogs;