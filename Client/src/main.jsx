import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
import { AuthProvider } from "./authProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
