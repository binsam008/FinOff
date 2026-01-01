import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addBusiness } from "../services/businessService";
import Modal from "./ui/Modal";

export default function AddBusinessModal({ onClose, refresh }) {
  const { user } = useAuth();
  const [name, setName] = useState("");

  const submit = async () => {
    if (!name.trim()) return alert("Enter business name");

    await addBusiness(user.uid, {
      name,
      currency: "INR",
    });

    refresh();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-purple-400 text-lg mb-4">
        Add Business
      </h2>

      <input
        className="w-full mb-4 p-2 rounded bg-[#0b0b10]"
        placeholder="Business Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
      >
        Save
      </button>
    </Modal>
  );
}
