import { useState, useEffect } from "react";
import axios from "axios";

// 🔥 ADDED (chart library)
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);

  const [workshops, setWorkshops] = useState([]);

  // 🔥 UPDATED STATES (added admins)
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    workshops: 0,
    registrations: 0
  });

  const [title, setTitle] = useState("");
  const [trainer, setTrainer] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // ✅ FETCH WORKSHOPS
  const fetchWorkshops = async () => {
    const res = await axios.get("https://fsad-backend-final-epfs.onrender.com/api/workshops");
    setWorkshops(res.data);

    setStats(prev => ({
      ...prev,
      workshops: res.data.length
    }));
  };

  // 🔥 UPDATED: FETCH USERS + ADMINS SEPARATELY
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://fsad-backend-final-epfs.onrender.com/api/users");

      const users = res.data.filter(u => u.role !== "admin").length;
      const admins = res.data.filter(u => u.role === "admin").length;

      setStats(prev => ({
        ...prev,
        users: users,
        admins: admins
      }));

    } catch {
      console.log("Users API not available");
    }
  };

  // 🔥 FETCH REGISTRATIONS
  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("https://fsad-backend-final-epfs.onrender.com/api/registrations");
      setStats(prev => ({
        ...prev,
        registrations: res.data.length
      }));
    } catch {
      console.log("Registrations API not available");
    }
  };

  useEffect(() => {
    fetchWorkshops();
    fetchUsers();
    fetchRegistrations();
  }, []);

  // ✅ CREATE WORKSHOP
  const handleCreate = async () => {
    if (!title || !trainer || !date) {
      alert("Fill all fields ❌");
      return;
    }

    await axios.post("https://fsad-backend-final-epfs.onrender.com/api/workshops", {
      title,
      trainer,
      date,
      description
    });

    alert("Workshop Created Successfully ✅");

    setTitle("");
    setTrainer("");
    setDate("");
    setDescription("");

    setShowCreate(false);
    fetchWorkshops();
  };

  // ✅ DELETE WORKSHOP
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    await axios.delete(`https://fsad-backend-final-epfs.onrender.com/api/workshops/${id}`);
    alert("Deleted Successfully ✅");
    fetchWorkshops();
  };

  // 🔥 ADDED: CHART DATA (no removal)
  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Admins", value: stats.admins },
    { name: "Workshops", value: stats.workshops },
    { name: "Registrations", value: stats.registrations }
  ];

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {/* 🔥 UPDATED STATS CARDS */}
      <div className="stats-container">

        <div className="stat-card">
          <h3>👤 Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>👑 Admins</h3>
          <p>{stats.admins}</p>
        </div>

        <div className="stat-card">
          <h3>📚 Workshops</h3>
          <p>{stats.workshops}</p>
        </div>

        <div className="stat-card">
          <h3>📝 Registrations</h3>
          <p>{stats.registrations}</p>
        </div>

      </div>

      {/* 🔥 ADDED: CHART (NO REMOVAL OF EXISTING CODE) */}
      <div className="chart-container">
        <h2>Platform Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
  dataKey="value"
  fill="#7fb3ff"
  radius={[6, 6, 0, 0]}
  isAnimationActive={true}
  animationDuration={1500}
  animationEasing="ease-out"
/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="admin-container">

        {/* CREATE */}
        <div className="admin-card">
          <h3>Create New Workshop</h3>
          <button onClick={() => setShowCreate(true)}>
            Create Workshop
          </button>
        </div>

        {/* MANAGE */}
        <div className="admin-card">
          <h3>Manage Workshops</h3>
          <button onClick={() => setShowView(true)}>
            View Workshops
          </button>
        </div>

      </div>

      {/* ================= CREATE POPUP ================= */}
      {showCreate && (
        <div className="popup">
          <div className="popup-content">

            <div className="popup-header">
              <h3>Create Workshop</h3>
              <span onClick={() => setShowCreate(false)}>✖</span>
            </div>

            <div className="form-container">
              <input
                type="text"
                placeholder="Workshop Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Trainer Name"
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="btn-group">
                <button onClick={handleCreate}>Submit</button>

                <button
                  className="secondary-btn"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= VIEW POPUP ================= */}
      {showView && (
        <div className="popup">
          <div className="popup-content scroll-box">

            <div className="popup-header sticky">
              <h3>All Workshops</h3>
              <span onClick={() => setShowView(false)}>✖</span>
            </div>

            {workshops.length === 0 ? (
              <p>No workshops available</p>
            ) : (
              workshops.map((w) => (
                <div key={w.id} className="workshop-card">
                  <strong>{w.title}</strong> <br />
                  Trainer: {w.trainer} <br />
                  Date: {w.date}

                  <button
                    onClick={() => handleDelete(w.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}

            <button
              className="secondary-btn"
              onClick={() => setShowView(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;