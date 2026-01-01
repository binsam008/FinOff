import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ children, onClose }) {
  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* STOP CLICK PROPAGATION */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#12121a] w-[380px] rounded-xl border border-purple-500/30 p-6 shadow-2xl"
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}
