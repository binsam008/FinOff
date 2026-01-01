import { generateOfficeReport } from "../services/reportService";

export default function DownloadReport({ records, meta }) {
  if (!records || records.length === 0) return null;

  return (
    <button
      onClick={() => generateOfficeReport(records, meta)}
      className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg"
    >
      Download Monthly Report
    </button>
  );
}
