import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecords } from "../services/recordService";

import AddRecordModal from "../components/AddRecordModal";
import AnalyticsCharts from "../components/AnalyticsCharts";
import ExcelImport from "../components/ExcelImport";
import DownloadReport from "../components/DownloadReport";
import RoleGuard from "../components/RoleGuard";

export default function OfficeDetails() {
  const { businessId, officeId } = useParams();
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD RECORDS ================= */
  const load = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getRecords(user.uid, businessId, officeId);
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user, businessId, officeId]);

  /* ================= TOTALS (OFFICE CURRENCY) ================= */
  const totalRevenue = records.reduce(
    (sum, r) => sum + (r.revenue || 0),
    0
  );

  const totalExpense = records.reduce(
    (sum, r) => sum + (r.expense || 0),
    0
  );

  const totalProfit = totalRevenue - totalExpense;

  const profitPercent =
    totalRevenue > 0
      ? ((totalProfit / totalRevenue) * 100).toFixed(2)
      : "0.00";

  const officeCurrency =
    records.length > 0 ? records[0].currency : "";

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-purple-400 text-xl font-semibold">
          Office Analytics
          {officeCurrency && (
            <span className="ml-2 text-xs text-gray-400">
              (Currency: {officeCurrency})
            </span>
          )}
        </h1>

        <div className="flex gap-3">
          <DownloadReport
            records={records}
            meta={{ business: businessId, office: officeId }}
          />

          <RoleGuard allow={["owner", "manager"]}>
            <button
              onClick={() => setOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              + Add Record
            </button>
          </RoleGuard>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {loading ? (
        <p className="text-gray-400">Loading analytics...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20">
            <p className="text-gray-400 text-sm">Revenue</p>
            <p className="text-lg font-semibold">
              {officeCurrency} {totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20">
            <p className="text-gray-400 text-sm">Expense</p>
            <p className="text-lg font-semibold">
              {officeCurrency} {totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/40">
            <p className="text-gray-400 text-sm">Profit Margin</p>
            <p className="text-lg font-semibold text-purple-400">
              {profitPercent}%
            </p>
          </div>

        </div>
      )}

      {/* ================= EXCEL IMPORT ================= */}
      <RoleGuard allow={["owner", "manager"]}>
        <ExcelImport
          businessId={businessId}
          officeId={officeId}
          refresh={load}
        />
      </RoleGuard>

      {/* ================= CHARTS ================= */}
      <AnalyticsCharts records={records} />

      {/* ================= ADD RECORD MODAL ================= */}
      {open && (
        <AddRecordModal
          businessId={businessId}
          officeId={officeId}
          refresh={load}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
