import { useEffect, useMemo, useState } from "react";
import { Toast } from "../components/Toast";

export function DashboardPage({ api, token, admin, onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [toast, setToast] = useState(null);

  const authConfig = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    [token]
  );

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const { data } = await api.get("/appointments", authConfig);
      setAppointments(data);
    } catch (error) {
      showToast(error.response?.data?.message || "Unable to fetch appointments", "error");
      if (error.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);

    try {
      await api.put(`/appointments/${id}`, { status }, authConfig);
      showToast(`Appointment ${status} successfully`);
      fetchAppointments();
    } catch (error) {
      showToast(error.response?.data?.message || "Status update failed", "error");
    } finally {
      setUpdatingId("");
    }
  };

  const metrics = useMemo(() => {
    const pending = appointments.filter((item) => item.status === "pending").length;
    const approved = appointments.filter((item) => item.status === "approved").length;
    const rejected = appointments.filter((item) => item.status === "rejected").length;

    return { pending, approved, rejected, total: appointments.length };
  }, [appointments]);

  return (
    <div className="admin-shell">
      <Toast toast={toast} />

      <header className="dashboard-topbar">
        <div>
          <span className="pill">Admin Panel</span>
          <h1>Appointment Workflow Dashboard</h1>
          <p>Signed in as {admin?.email}</p>
        </div>
        <button className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="metrics-grid">
        <article className="metric-card">
          <span>Total Requests</span>
          <strong>{metrics.total}</strong>
        </article>
        <article className="metric-card">
          <span>Pending</span>
          <strong>{metrics.pending}</strong>
        </article>
        <article className="metric-card">
          <span>Approved</span>
          <strong>{metrics.approved}</strong>
        </article>
        <article className="metric-card">
          <span>Rejected</span>
          <strong>{metrics.rejected}</strong>
        </article>
      </section>

      <section className="table-card">
        <div className="table-head">
          <div>
            <h2>Appointments</h2>
            <p>Review requests and approve or reject them.</p>
          </div>
          <button className="ghost-btn" onClick={fetchAppointments}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">No appointments found.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td className="message-cell">{item.message || "No message"}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>{item.status}</span>
                    </td>
                    <td>
                      <div className="action-row">
                        <button
                          className="approve-btn"
                          onClick={() => updateStatus(item._id, "approved")}
                          disabled={updatingId === item._id}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(item._id, "rejected")}
                          disabled={updatingId === item._id}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
