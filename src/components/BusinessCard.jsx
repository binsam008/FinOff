import { Link } from "react-router-dom";

export default function BusinessCard({ business }) {
  return (
    <Link
      to={`/business/${business.id}`}
      className="bg-[#12121a] p-5 rounded-xl border border-purple-500/20 hover:border-purple-500 transition"
    >
      <h3 className="text-purple-400 text-lg">{business.name}</h3>
      <p className="text-gray-400 text-sm">
        Currency: {business.currency}
      </p>
    </Link>
  );
}
