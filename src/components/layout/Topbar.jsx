import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useInvestor } from "../../context/InvestorContext";

export default function Topbar() {
  const navigate = useNavigate();
  const { investorMode, setInvestorMode } = useInvestor();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0b10]/80 backdrop-blur
                       border-b border-purple-500/20">
      <div className="flex justify-between items-center px-6 py-4 max-w-[1400px] mx-auto">
        <h1 className="text-purple-400 font-semibold tracking-wide">
          Multi-Business CRM
        </h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setInvestorMode(!investorMode)}
            className="text-xs border border-purple-500 px-3 py-1 rounded-lg
                       hover:bg-purple-500/10"
          >
            {investorMode ? "Exit Investor Mode" : "Investor Mode"}
          </button>

          <button
            onClick={handleLogout}
            className="btn-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
