import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import BusinessDetails from "./pages/BusinessDetails";
import OfficeDetails from "./pages/OfficeDetails";
import BusinessAnalytics from "./pages/BusinessAnalytics";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading authentication…
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BusinessDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business/:businessId/office/:officeId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <OfficeDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business/:businessId/analytics"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BusinessAnalytics />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
