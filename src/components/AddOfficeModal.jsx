import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addOffice } from "../services/businessService";
import Modal from "./ui/Modal";

export default function AddOfficeModal({
  businessId,
  refresh,
  onClose,
}) {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [currency, setCurrency] = useState("INR");

  const submit = async () => {
    if (!name || !currency) {
      alert("Office name and currency required");
      return;
    }

    await addOffice(user.uid, businessId, {
      name,
      city,
      currency, // ✅ SAVED
    });

    refresh();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-purple-400 text-lg mb-4">
        Add Office
      </h2>

      <input
        className="w-full mb-3 p-2 rounded bg-[#0b0b10]"
        placeholder="Office Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 rounded bg-[#0b0b10]"
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />

      {/* ✅ CURRENCY SELECT */}
<select
  value={currency}
  onChange={(e) => setCurrency(e.target.value)}
  className="w-full mb-4 p-2 bg-[#0b0b10] rounded"
>
  <option value="INR">INR – Indian Rupee</option>
  <option value="BHD">BHD – Bahraini Dinar</option>
  <option value="USD">USD – US Dollar</option>
</select>


      <button
        onClick={submit}
        className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
      >
        Save Office
      </button>
    </Modal>
  );
}
