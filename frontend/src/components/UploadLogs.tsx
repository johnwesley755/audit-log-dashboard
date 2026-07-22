import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import api from "../api/api";
import { toast } from "react-toastify";

const UploadLogs = () => {
  const uploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();

      const logs = JSON.parse(text);

      await api.post("/logs/upload", logs);

      toast.success("Logs uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    }
  };

  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
      <CloudUploadOutlinedIcon />

      Upload JSON

      <input
        type="file"
        accept=".json"
        hidden
        onChange={uploadFile}
      />
    </label>
  );
};

export default UploadLogs;