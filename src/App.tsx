import type React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./content/AuthContent";
import { CartProvider } from "./content/CartContent";
import { LoginPage } from "./pages/LoginPage";
import { MembershipPage } from "./pages/MembershipPage";
import { POSPage } from "./pages/POSpage";
import { OfficePage } from "./pages/OfficePage";
import { PendingBillsPage } from "./pages/PendingBill";
import { PaidBillsPage } from "./pages/PaidBill";

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/membership"
              element={
                <ProtectedRoute>
                  <MembershipPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pos"
              element={
                <ProtectedRoute>
                  <POSPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/office"
              element={
                <ProtectedRoute>
                  <OfficePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/office/pending-bills"
              element={
                <ProtectedRoute>
                  <PendingBillsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/office/paid-bills"
              element={
                <ProtectedRoute>
                  <PaidBillsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
