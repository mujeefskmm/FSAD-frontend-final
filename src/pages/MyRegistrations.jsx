import { useEffect, useState } from "react";
import axios from "axios";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://fsad-backend-final-epfs.onrender.com/api/registrations/${user.id}`)
      .then((res) => setRegistrations(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    axios
      .get("https://fsad-backend-final-epfs.onrender.com/api/workshops")
      .then((res) => setWorkshops(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ UPDATED WITH CONFIRMATION POPUP
  const handleUnregister = async (workshopId) => {
    const confirmAction = window.confirm(
      "Are you sure you want to unregister from this workshop?"
    );

    if (!confirmAction) return;

    try {
      await axios.delete(
        `https://fsad-backend-final-epfs.onrender.com/api/registrations?userId=${user.id}&workshopId=${workshopId}`
      );

      setRegistrations((prev) =>
        prev.filter((r) => r.workshopId !== workshopId)
      );

      alert("Unregistered successfully ❌");
    } catch (err) {
      console.log(err);
      alert("Error while unregistering");
    }
  };

  const registeredWorkshops = workshops.filter((w) =>
    registrations.some((r) => r.workshopId === w.id)
  );

  return (
    <div className="container">
      <h1>My Registrations</h1>

      {registeredWorkshops.length === 0 ? (
        <p>No workshops registered yet ❌</p>
      ) : (
        <div className="card-container">
          {registeredWorkshops.map((workshop) => (
            <div className="card" key={workshop.id}>
              <h3>{workshop.title}</h3>
              <p><strong>Trainer:</strong> {workshop.trainer}</p>
              <p><strong>Date:</strong> {workshop.date}</p>
              <p>{workshop.description}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                
                {/* ✅ REGISTERED BUTTON */}
                <button
                  disabled
                  style={{ background: "green", color: "white" }}
                >
                  Registered ✅
                </button>

                {/* ❌ UNREGISTER BUTTON */}
                <button
                  onClick={() => handleUnregister(workshop.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Unregister ❌
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;