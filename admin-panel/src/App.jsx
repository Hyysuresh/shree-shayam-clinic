import { useEffect, useState } from "react";
import axios from "axios";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("clinic_admin_token"));
  const [admin, setAdmin] = useState(() => {
    const raw = localStorage.getItem("clinic_admin_profile");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("clinic_admin_token", token);
    } else {
      localStorage.removeItem("clinic_admin_token");
    }
  }, [token]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("clinic_admin_profile", JSON.stringify(admin));
    } else {
      localStorage.removeItem("clinic_admin_profile");
    }
  }, [admin]);

  if (!token) {
    return (
      <LoginPage
        api={api}
        onLogin={({ token: authToken, admin: profile }) => {
          setToken(authToken);
          setAdmin(profile);
        }}
      />
    );
  }

  return (
    <DashboardPage
      api={api}
      token={token}
      admin={admin}
      onLogout={() => {
        setToken("");
        setAdmin(null);
      }}
    />
  );
}

