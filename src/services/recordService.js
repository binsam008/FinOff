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

/* ================= CHECK DUPLICATE ================= */

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
  if (!officeCurrency) {
    throw new Error("Office currency missing");
  }

  const revenue = Number(data.revenue) || 0;
  const expense = Number(data.expense) || 0;
  const profit = revenue - expense;

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

      currency: officeCurrency, // ✅ ONLY currency

      createdAt: serverTimestamp(),
    }
  );
};

/* ================= DELETE RECORD ================= */

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

  return snap.docs.map((d) => {
    const data = d.data();

    const profitPercent =
      data.revenue > 0
        ? ((data.profit / data.revenue) * 100).toFixed(2)
        : "0.00";

    return {
      id: d.id,
      ...data,
      profitPercent: Number(profitPercent),
    };
  });
};
