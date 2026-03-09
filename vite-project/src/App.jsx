import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const [formData, setFormData] = useState({
    petName: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      ...formData,
      approved: false,
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({ petName: "", description: "", date: "" });
    setShowForm(false);
  };

  const handleApprove = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, approved: true } : app
      )
    );
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  // 🔍 Filter + Sort logic
  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter(
      (app) =>
        app.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "approved") {
      filtered.sort((a, b) => b.approved - a.approved);
    }

    return filtered;
  }, [appointments, searchTerm, sortOption]);

  return (
    <div className="container">
      <header className="header">🐾 Pets Medicare</header>

      <main className="main">
        <div className="top-bar">
          <h2>Appointments</h2>
          <button onClick={() => setShowForm(!showForm)} className="primary-btn">
            + Add Appointment
          </button>
        </div>

        {/* 🔍 SEARCH + SORT */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search by pet name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="approved">Sort by Approved First</option>
          </select>
        </div>

        {showForm && (
          <div className="form-card">
            <h3>Add Appointment</h3>
            <form onSubmit={handleAddAppointment}>
              <input
                type="text"
                name="petName"
                placeholder="Pet Name"
                value={formData.petName}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <button type="submit" className="primary-btn">
                Add Appointment
              </button>
            </form>
          </div>
        )}

        {filteredAppointments.length === 0 ? (
          <p className="empty">No appointments found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Pet Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app) => (
                <tr key={app.id}>
                  <td>{app.petName}</td>
                  <td>{app.description}</td>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={
                        app.approved ? "status approved" : "status pending"
                      }
                    >
                      {app.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td>
                    {!app.approved && (
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer className="footer">
        © 2026 Pet Clinic. All rights reserved.
      </footer>
    </div>
  );
}

export default App;