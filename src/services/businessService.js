import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

/* ================= BUSINESS ================= */

export const addBusiness = async (userId, data) => {
  return await addDoc(
    collection(db, "users", userId, "businesses"),
    {
      name: data.name,
      currency: data.currency || "INR",
      createdAt: serverTimestamp(),
    }
  );
};

export const getBusinesses = async (userId) => {
  const snap = await getDocs(
    collection(db, "users", userId, "businesses")
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const deleteBusiness = async (userId, businessId) => {
  await deleteDoc(
    doc(db, "users", userId, "businesses", businessId)
  );
};

/* ================= OFFICE ================= */

export const addOffice = async (userId, businessId, data) => {
  return await addDoc(
    collection(
      db,
      "users",
      userId,
      "businesses",
      businessId,
      "offices"
    ),
    {
      name: data.name,
      city: data.city,
      currency: data.currency || "INR", // ✅ REQUIRED
      createdAt: serverTimestamp(),
    }
  );
};

export const getOffices = async (userId, businessId) => {
  const snap = await getDocs(
    collection(
      db,
      "users",
      userId,
      "businesses",
      businessId,
      "offices"
    )
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const deleteOffice = async (
  userId,
  businessId,
  officeId
) => {
  await deleteDoc(
    doc(
      db,
      "users",
      userId,
      "businesses",
      businessId,
      "offices",
      officeId
    )
  );
};
