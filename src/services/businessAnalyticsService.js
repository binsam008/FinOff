import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getBusinessAnalytics = async (userId, businessId) => {
  const officesSnap = await getDocs(
    collection(db, "users", userId, "businesses", businessId, "offices")
  );

  let officeProfitRaw = [];
  let monthlyMap = {};

  for (const officeDoc of officesSnap.docs) {
    const officeId = officeDoc.id;
    const officeName = officeDoc.data().name;

    const recordsSnap = await getDocs(
      collection(
        db,
        "users",
        userId,
        "businesses",
        businessId,
        "offices",
        officeId,
        "records"
      )
    );

    let totalRevenue = 0;
    let totalExpense = 0;
    let totalProfit = 0;

    recordsSnap.forEach((r) => {
      const d = r.data();

      // ✅ ALWAYS USE INR FIELDS
      const revenue = d.revenueINR ?? 0;
      const expense = d.expenseINR ?? 0;
      const profit = d.profitINR ?? 0;

      totalRevenue += revenue;
      totalExpense += expense;
      totalProfit += profit;

      const key = `${d.year}-${d.month}`;
      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          month: d.month,
          year: d.year,
          revenue: 0,
          expense: 0,
          profit: 0,
        };
      }

      monthlyMap[key].revenue += revenue;
      monthlyMap[key].expense += expense;
      monthlyMap[key].profit += profit;
    });

    officeProfitRaw.push({
      name: officeName,
      revenue: totalRevenue,
      expense: totalExpense,
      profit: totalProfit,
    });
  }

  const totalBusinessProfit = officeProfitRaw.reduce(
    (sum, o) => sum + o.profit,
    0
  );

  const officeProfit = officeProfitRaw.map((o) => ({
    name: o.name,
    revenue: o.revenue,
    expense: o.expense,
    value: o.profit, // pie chart uses `value`
    percent:
      totalBusinessProfit > 0
        ? ((o.profit / totalBusinessProfit) * 100).toFixed(2)
        : "0.00",
  }));

  const monthlyData = Object.values(monthlyMap).sort(
    (a, b) => a.year - b.year
  );

  return {
    officeProfit,
    monthlyData,
  };
};
