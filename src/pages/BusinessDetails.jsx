import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useInvestor } from "../context/InvestorContext";
import {
  getOffices,
  deleteOffice,
} from "../services/businessService";
import AddOfficeModal from "../components/AddOfficeModal";

export default function BusinessDetails() {
  const { id: businessId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { investorMode } = useInvestor();

  const [offices, setOffices] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getOffices(user.uid, businessId);
      setOffices(data);
    } catch (err) {
      console.error("Failed to load offices", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user, businessId]);

  /* ================= DELETE OFFICE ================= */
  const handleDeleteOffice = async (officeId) => {
    if (
      !window.confirm(
        "Delete this office?\nAll records under this office will be permanently removed."
      )
    )
      return;

    await deleteOffice(user.uid, businessId, officeId);
    load();
  };

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-purple-400 text-xl font-semibold">
          Offices
          {investorMode && (
            <span className="ml-2 text-xs text-yellow-400">
              (Investor Mode – Read Only)
            </span>
          )}
        </h1>

        <div className="flex gap-3 flex-wrap">
          <Link
            to={`/business/${businessId}/analytics`}
            className="bg-purple-700 hover:bg-purple-800 transition px-4 py-2 rounded-lg"
          >
            View Business Analytics
          </Link>

          {!investorMode && (
            <button
              onClick={() => setOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg"
            >
              + Office
            </button>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <p className="text-gray-400">Loading offices...</p>
      ) : offices.length === 0 ? (
        <div className="text-gray-400 bg-[#12121a] p-6 rounded-xl border border-purple-500/20">
          No offices found.<br />
          Add your first office to start tracking profits.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {offices.map((o) => (
            <div
              key={o.id}
              className="relative bg-[#12121a] p-4 rounded-xl border border-purple-500/20 hover:border-purple-500 transition"
            >
              {/* DELETE OFFICE */}
              {!investorMode && (
                <button
                  onClick={() => handleDeleteOffice(o.id)}
                  className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              )}

              {/* CARD CONTENT */}
              <div
                onClick={() =>
                  navigate(
                    `/business/${businessId}/office/${o.id}`
                  )
                }
                className="cursor-pointer"
              >
                <h3 className="text-purple-300 font-medium">
                  {o.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {o.city}
                </p>

                <p className="mt-4 text-purple-400 text-xs">
                  View Records →
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD OFFICE MODAL ================= */}
      {open && (
        <AddOfficeModal
          businessId={businessId}
          refresh={load}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
