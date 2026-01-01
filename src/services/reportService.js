import * as XLSX from "xlsx";

export const generateOfficeReport = (records, meta) => {
  // Prepare rows
  const rows = records.map((r) => ({
    Month: `${r.month} ${r.year}`,
    Revenue: r.revenue,
    Expense: r.expense,
    Profit: r.profit,
  }));

  // Add summary row
  const totalRevenue = records.reduce((s, r) => s + r.revenue, 0);
  const totalExpense = records.reduce((s, r) => s + r.expense, 0);
  const totalProfit = records.reduce((s, r) => s + r.profit, 0);

  rows.push({});
  rows.push({
    Month: "TOTAL",
    Revenue: totalRevenue,
    Expense: totalExpense,
    Profit: totalProfit,
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  // File name
  const fileName = `${meta.business}_${meta.office}_Report.xlsx`;

  XLSX.writeFile(workbook, fileName);
};
