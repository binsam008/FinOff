import { useState } from "react";
import { importExcelToOffice } from "../services/excelImportService";
import { useAuth } from "../context/AuthContext";

export default function ExcelImport({ businessId, officeId, refresh }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return alert("Select Excel file");

    setLoading(true);
    try {
      await importExcelToOffice(
        file,
        user.uid,
        businessId,
        officeId
      );
      alert("Excel data imported successfully");
      refresh();
    } catch (err) {
      alert("Import failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20">
      <h3 className="text-purple-400 mb-2">Import Monthly Excel</h3>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 block text-sm"
      />

      <button
        onClick={upload}
        disabled={loading}
        className="bg-purple-600 px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Importing..." : "Upload Excel"}
      </button>
    </div>
  );
}
