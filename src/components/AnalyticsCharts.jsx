import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AnalyticsCharts({ records }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">

      {/* REVENUE VS EXPENSE */}
      <div className="bg-[#12121a] p-4 rounded-xl">
        <h3 className="text-purple-400 mb-3">
          Revenue vs Expense
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={records}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#7c3aed" />
            <Bar dataKey="expense" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PROFIT PERCENTAGE */}
      <div className="bg-[#12121a] p-4 rounded-xl">
        <h3 className="text-purple-400 mb-3">
          Profit Margin (%)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={records}>
            <XAxis dataKey="month" />
            <YAxis unit="%" />
            <Tooltip formatter={(v) => `${v}%`} />
            <Line
              type="monotone"
              dataKey="profitPercent"
              stroke="#c084fc"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
