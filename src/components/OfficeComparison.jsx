import { useState } from "react";

export default function OfficeComparison({ offices }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const A = offices.find(o => o.name === a);
  const B = offices.find(o => o.name === b);

  return (
    <div className="bg-[#12121a] p-6 rounded-xl border border-purple-500/20">
      <h3 className="text-purple-400 mb-4">
        Office Comparison
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select onChange={(e) => setA(e.target.value)} className="bg-black p-2 rounded">
          <option>Select Office A</option>
          {offices.map(o => <option key={o.name}>{o.name}</option>)}
        </select>

        <select onChange={(e) => setB(e.target.value)} className="bg-black p-2 rounded">
          <option>Select Office B</option>
          {offices.map(o => <option key={o.name}>{o.name}</option>)}
        </select>
      </div>

      {A && B && (
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td>Revenue</td>
              <td>₹{A.revenue.toLocaleString()}</td>
              <td>₹{B.revenue.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Profit %</td>
              <td>{A.percent}%</td>
              <td>{B.percent}%</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{A.percent >= 15 ? "Healthy" : "Risk"}</td>
              <td>{B.percent >= 15 ? "Healthy" : "Risk"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
