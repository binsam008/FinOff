import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

/* ✅ GOOGLE LOGIN (POPUP — STABLE) */
export const googleLogin = async () => {
  await signInWithPopup(auth, googleProvider);
};

/* EMAIL SIGN UP */
export const emailSignUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/* EMAIL SIGN IN */
export const emailSignIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/* LOGOUT */
export const logout = async () => {
  await signOut(auth);
};
