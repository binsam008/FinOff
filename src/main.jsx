import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { InvestorProvider } from "./context/InvestorContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <InvestorProvider>
      <App />
    </InvestorProvider>
  </AuthProvider>
);
