import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line
} from "recharts";

const COLORS = ["#7c3aed", "#9333ea", "#a855f7", "#c084fc"];

export default function BusinessAnalyticsCharts({ officeProfit, monthlyData }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">

      {/* PROFIT BY OFFICE */}
      <div className="bg-[#12121a] p-4 rounded-xl">
        <h3 className="text-purple-400 mb-2">Profit by Office</h3>
        <PieChart width={260} height={260}>
          <Pie
            data={officeProfit}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          >
            {officeProfit.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* REVENUE VS EXPENSE */}
      <div className="bg-[#12121a] p-4 rounded-xl">
        <h3 className="text-purple-400 mb-2">Revenue vs Expense</h3>
        <BarChart width={320} height={260} data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#7c3aed" />
          <Bar dataKey="expense" fill="#9333ea" />
        </BarChart>
      </div>

      {/* PROFIT TREND */}
      <div className="bg-[#12121a] p-4 rounded-xl">
        <h3 className="text-purple-400 mb-2">Profit Trend</h3>
        <LineChart width={320} height={260} data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="profit" stroke="#c084fc" strokeWidth={2} />
        </LineChart>
      </div>

    </div>
  );
}
