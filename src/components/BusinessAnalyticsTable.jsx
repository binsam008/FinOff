export default function BusinessAnalyticsTable({ data }) {
  return (
    <div className="bg-[#12121a] rounded-xl border border-purple-500/20">
      <div className="px-6 py-4 border-b border-purple-500/20">
        <h3 className="text-purple-400 text-lg">
          Office Performance Summary
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-sm">
          <thead className="bg-[#0b0b10] text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Office</th>
              <th className="px-6 py-3 text-right">Revenue</th>
              <th className="px-6 py-3 text-right">Expense</th>
              <th className="px-6 py-3 text-right">Profit</th>
              <th className="px-6 py-3 text-right">Profit %</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((o, i) => {
              const status =
                o.percent >= 30
                  ? "Excellent"
                  : o.percent >= 15
                  ? "Good"
                  : "Risk";

              const color =
                status === "Excellent"
                  ? "text-green-400"
                  : status === "Good"
                  ? "text-yellow-400"
                  : "text-red-400";

              return (
                <tr
                  key={i}
                  className="border-t border-purple-500/10 hover:bg-[#0b0b10]"
                >
                  <td className="px-6 py-4">{o.name}</td>

                  <td className="px-6 py-4 text-right">
                    ₹{o.revenue.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    ₹{o.expense.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right text-purple-300">
                    ₹{o.value.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right text-purple-400">
                    {o.percent}%
                  </td>

                  <td className={`px-6 py-4 text-center font-medium ${color}`}>
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
