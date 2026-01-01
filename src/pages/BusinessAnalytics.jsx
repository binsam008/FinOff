import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useInvestor } from "../context/InvestorContext";
import { getBusinessAnalytics } from "../services/businessAnalyticsService";

import BusinessAnalyticsTable from "../components/BusinessAnalyticsTable";
import WhatIfSimulator from "../components/WhatIfSimulator";
import OfficeComparison from "../components/OfficeComparison";
import GlassTooltip from "../components/ui/GlassTooltip";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#7c3aed", "#9333ea", "#a855f7", "#c084fc"];

export default function BusinessAnalytics() {
  const { businessId } = useParams();
  const { user } = useAuth();
  const { investorMode } = useInvestor();

  const [officeProfit, setOfficeProfit] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (!user) return;

    getBusinessAnalytics(user.uid, businessId).then((res) => {
      setOfficeProfit(res.officeProfit);
      setMonthlyData(res.monthlyData);
    });
  }, [user, businessId]);

  /* ================= TOTALS ================= */
  const totalProfit = officeProfit.reduce(
    (sum, o) => sum + (o.value || 0),
    0
  );

  const totalRevenue = officeProfit.reduce(
    (sum, o) => sum + (o.revenue || 0),
    0
  );

  const totalExpense = officeProfit.reduce(
    (sum, o) => sum + (o.expense || 0),
    0
  );

  /* ================= PIE DATA ================= */
  const pieData = officeProfit.map((o) => ({
    name: o.name,
    value: o.value,
    percent:
      totalProfit > 0
        ? ((o.value / totalProfit) * 100).toFixed(2)
        : "0.00",
  }));

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white p-6">

      {/* ================= HEADER ================= */}
      <h1 className="text-purple-400 text-xl mb-6">
        Business Analytics
        {investorMode && (
          <span className="ml-3 text-xs text-yellow-400">
            (Investor Mode – Read Only)
          </span>
        )}
      </h1>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* ================= PIE ================= */}
        <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20">
          <h3 className="text-purple-400 mb-3">
            Profit by Office (%)
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                labelLine={false}
                label={({ payload }) => `${payload.percent}%`}
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip content={<GlassTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ================= BAR ================= */}
        <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20">
          <h3 className="text-purple-400 mb-3">
            Revenue vs Expense
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<GlassTooltip />} />
              <Bar dataKey="revenue" fill="#7c3aed" />
              <Bar dataKey="expense" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= LINE ================= */}
        <div className="bg-[#12121a] p-4 rounded-xl border border-purple-500/20">
          <h3 className="text-purple-400 mb-3">
            Profit Trend
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<GlassTooltip />} />
              <Line
                dataKey="profit"
                stroke="#c084fc"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= INNOVATIVE SECTION ================= */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <WhatIfSimulator
          revenue={totalRevenue}
          expense={totalExpense}
        />

        <OfficeComparison offices={officeProfit} />
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-10">
        <BusinessAnalyticsTable data={officeProfit} />
      </div>
    </div>
  );
}
