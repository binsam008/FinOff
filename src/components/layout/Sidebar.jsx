import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RoleGuard from "../RoleGuard";

export default function Sidebar() {
  const { role } = useAuth();

  return (
    <aside className="w-64 bg-[#0f0f17] border-r border-purple-500/20 flex flex-col">

      <div className="p-6 border-b border-purple-500/20">
        <h1 className="text-purple-400 font-semibold">CRM Dashboard</h1>
        <p className="text-xs text-gray-500">Role: {role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block text-gray-300 hover:text-white">
          Dashboard
        </Link>

        <RoleGuard allow={["owner", "manager"]}>
          <Link to="/" className="block text-gray-300 hover:text-white">
            Businesses
          </Link>
        </RoleGuard>

        <RoleGuard allow={["investor"]}>
          <Link to="/investor" className="block text-gray-300 hover:text-white">
            Investor View
          </Link>
        </RoleGuard>
      </nav>
    </aside>
  );
}
