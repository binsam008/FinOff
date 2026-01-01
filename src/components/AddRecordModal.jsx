import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addRecord } from "../services/recordService";
import {
  getOffices,
  getBusinesses,
} from "../services/businessService";
import Modal from "./ui/Modal";

export default function AddRecordModal({
  businessId,
  officeId,
  refresh,
  onClose,
}) {
  const { user } = useAuth();

  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenue, setRevenue] = useState("");
  const [expense, setExpense] = useState("");

  const [officeCurrency, setOfficeCurrency] = useState(null);
  const [businessCurrency, setBusinessCurrency] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadCurrencies = async () => {
      try {
        const offices = await getOffices(user.uid, businessId);
        const office = offices.find(o => o.id === officeId);

        const businesses = await getBusinesses(user.uid);
        const business = businesses.find(b => b.id === businessId);

        setOfficeCurrency(office?.currency || "INR");
        setBusinessCurrency(business?.currency || "INR");
      } catch (err) {
        console.error(err);
        setOfficeCurrency("INR");
        setBusinessCurrency("INR");
      }
    };

    loadCurrencies();
  }, [user, businessId, officeId]);

  const submit = async () => {
    if (!officeCurrency || !businessCurrency) {
      alert("Currency not ready yet");
      return;
    }

    setLoading(true);

    await addRecord(
      user.uid,
      businessId,
      officeId,
      {
        month,
        year,
        revenue,
        expense,
      },
      officeCurrency,
      
    );

    setLoading(false);
    refresh();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-purple-400 text-lg mb-4">
        Add Monthly Record
      </h2>

      <select
        className="w-full mb-3 p-2 rounded bg-[#0b0b10]"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {[
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec",
        ].map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <input
        type="number"
        className="w-full mb-3 p-2 rounded bg-[#0b0b10]"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 rounded bg-[#0b0b10]"
        placeholder={`Revenue (${officeCurrency || "…"})`}
        onChange={(e) => setRevenue(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 rounded bg-[#0b0b10]"
        placeholder={`Expense (${officeCurrency || "…"})`}
        onChange={(e) => setExpense(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={submit}
        className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
  Converted from {officeCurrency} → INR
    </p>

    </Modal>
  );
}
