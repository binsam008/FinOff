import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useInvestor } from "../context/InvestorContext";
import {
  getBusinesses,
  deleteBusiness,
} from "../services/businessService";
import AddBusinessModal from "../components/AddBusinessModal";

export default function Dashboard() {
  const { user } = useAuth();
  const { investorMode } = useInvestor();
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const data = await getBusinesses(user.uid);
    setBusinesses(data);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const handleDeleteBusiness = async (id) => {
    if (
      !window.confirm(
        "Delete business, all offices and records?"
      )
    )
      return;

    await deleteBusiness(user.uid, id);
    load();
  };

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-purple-400 text-xl">
          Your Businesses
        </h1>

        {!investorMode && (
          <button
            onClick={() => setOpen(true)}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            + Business
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {businesses.map((b) => (
          <div
            key={b.id}
            className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20"
          >
            <h3 className="text-purple-300">
              {b.name}
            </h3>
            <p className="text-gray-400">
              Currency: {b.currency}
            </p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() =>
                  navigate(`/business/${b.id}`)
                }
                className="text-purple-400 text-sm"
              >
                Open
              </button>

              {!investorMode && (
                <button
                  onClick={() =>
                    handleDeleteBusiness(b.id)
                  }
                  className="text-red-400 text-xs"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <AddBusinessModal
          refresh={load}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
