import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

/* ================= FX → INR ================= */

const convertToINR = async (amount, fromCurrency) => {
  const safeAmount = Number(amount) || 0;

  if (!fromCurrency || fromCurrency === "INR") {
    return { inr: safeAmount, rate: 1 };
  }

  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=INR`
    );
    const data = await res.json();
    const rate = Number(data?.rates?.INR);

    if (!rate || isNaN(rate)) {
      return { inr: safeAmount, rate: 1 };
    }

    return {
      inr: Number((safeAmount * rate).toFixed(2)),
      rate: Number(rate.toFixed(4)),
    };
  } catch {
    return { inr: safeAmount, rate: 1 };
  }
};

/* ================= DUPLICATE CHECK ================= */

export const recordExists = async (
  userId,
  businessId,
  officeId,
  month,
  year
) => {
  const q = query(
    collection(
      db,
      "users",
      userId,
      "businesses",
      businessId,
      "offices",
      officeId,
      "records"
    ),
    where("month", "==", month),
    where("year", "==", year)
  );
  const snap = await getDocs(q);
  return !snap.empty;
};

/* ================= ADD RECORD ================= */

export const addRecord = async (
  userId,
  businessId,
  officeId,
  data,
  officeCurrency
) => {
  const revenue = Number(data.revenue) || 0;
  const expense = Number(data.expense) || 0;
  const profit = revenue - expense;

  const revFX = await convertToINR(revenue, officeCurrency);
  const expFX = await convertToINR(expense, officeCurrency);

  await addDoc(
    collection(
      db,
      "users",
      userId,
      "businesses",
      businessId,
      "offices",
      officeId,
      "records"
    ),
    {
      month: data.month,
      year: data.year,

      revenue,
      expense,
      profit,
      currency: officeCurrency,

      revenueINR: revFX.inr,
      expenseINR: expFX.inr,
      profitINR: revFX.inr - expFX.inr,
      exchangeRate: revFX.rate,

      baseCurrency: "INR",
      createdAt: serverTimestamp(),
    }
  );
};

/* ================= DELETE ================= */

export const deleteRecord = async (
  userId,
  businessId,
  officeId,
  recordId
) => {
  await deleteDoc(
    doc(
      db,
      "users",
      userId,
      "businesses",
      businessId,
      "offices",
      officeId,
      "records",
      recordId
    )
  );
};

/* ================= GET RECORDS ================= */

export const getRecords = async (
  userId,
  businessId,
  officeId
) => {
  const snap = await getDocs(
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

  return snap.docs.map(d => {
    const r = d.data();
    const profitPercent =
      r.revenueINR > 0
        ? ((r.profitINR / r.revenueINR) * 100).toFixed(2)
        : "0.00";

    return {
      id: d.id,
      ...r,
      profitPercent: Number(profitPercent),
    };
  });
};
