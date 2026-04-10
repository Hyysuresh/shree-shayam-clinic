import { useState } from "react";
import { Toast } from "../components/Toast";

export function LoginPage({ api, onLogin }) {
  const [form, setForm] = useState({
    email: "admin@shreeramsahaydental.com",
    password: "Admin@12345"
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const setField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/login", form);
      onLogin(data);
    } catch (error) {
      setToast({
        type: "error",
        message: error.response?.data?.message || "Login failed"
      });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell center-screen">
      <Toast toast={toast} />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <form className="login-card" onSubmit={handleSubmit}>
        <span className="pill">Secure Admin Access</span>
        <h1>Clinic Dashboard</h1>
        <p>Manage appointment approvals, rejections, and patient requests.</p>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={setField}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={setField}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

