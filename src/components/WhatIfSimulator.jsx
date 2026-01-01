import { useState } from "react";

export default function WhatIfSimulator({ revenue, expense }) {
  const [revChange, setRevChange] = useState(0);
  const [expChange, setExpChange] = useState(0);

  const newRevenue = revenue * (1 + revChange / 100);
  const newExpense = expense * (1 - expChange / 100);
  const profit = newRevenue - newExpense;
  const margin =
    newRevenue > 0 ? ((profit / newRevenue) * 100).toFixed(2) : 0;

  return (
    <div className="bg-[#12121a] p-6 rounded-xl border border-purple-500/20">
      <h3 className="text-purple-400 mb-4">
        What-If Profit Simulator
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-purple-400 text-sm">
            Increase Revenue (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={revChange}
            onChange={(e) => setRevChange(+e.target.value)}
            className="w-full"
          />
          <p className="text-purple-300">{revChange}%</p>
        </div>

        <div>
          <label className="text-purple-400 text-sm">
            Reduce Expense (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={expChange}
            onChange={(e) => setExpChange(+e.target.value)}
            className="w-full item-colors-purple-400"
          />
          <p className="text-purple-300">{expChange}%</p>
        </div>

        <div className="pt-3 text-sm">
          <p>
            New Profit:
            <span className="text-green-400 ml-2">
              ₹{profit.toLocaleString()}
            </span>
          </p>
          <p>
            Profit Margin:
            <span className="text-purple-400 ml-2">
              {margin}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
