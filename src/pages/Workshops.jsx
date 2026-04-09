import { useState, useEffect } from "react";
import axios from "axios";

function Workshops() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [viewWorkshop, setViewWorkshop] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [workshops, setWorkshops] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);

  // ✅ SAFE USER PARSE (FIXED)
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (e) {
    user = null;
  }

  useEffect(() => {
    axios.get("http://localhost:8081/api/workshops")
      .then(res => setWorkshops(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (user && user.role !== "admin") {
      axios
        .get(`http://localhost:8081/api/registrations/${user.id}`)
        .then(res => {
          const ids = res.data.map(r => r.workshopId);
          setRegisteredIds(ids);
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  const displayWorkshops = workshops;

  const handleJoin = (workshop) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setSelectedWorkshop(workshop);
    setName(user.name || "");
    setEmail(user.email || "");
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8081/api/registrations", {
        userId: user.id,
        workshopId: selectedWorkshop.id
      });

      setRegisteredIds([...registeredIds, selectedWorkshop.id]);
      setSelectedWorkshop(null);
      alert("Registered ✅");

    } catch {
      alert("Already registered ❌");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/api/workshops/${id}`);
    setWorkshops(workshops.filter(w => w.id !== id));
  };

  return (
    <div className="container">
      <h1>All Workshops</h1>

      <div className="card-container">
        {displayWorkshops.map((workshop) => (
          <div className="card" key={workshop.id}>
            <h3>{workshop.title}</h3>
            <p><strong>Trainer:</strong> {workshop.trainer}</p>
            <p><strong>Date:</strong> {workshop.date}</p>
            <p>{workshop.description}</p>

            {user && user.role === "admin" ? (
              <>
                <button onClick={() => setViewWorkshop(workshop)}>View</button>
                <button onClick={() => handleDelete(workshop.id)}>Delete</button>
              </>
            ) : (
              registeredIds.includes(workshop.id) ? (
                <button disabled style={{ background: "green", color: "white" }}>
                  Registered ✅
                </button>
              ) : (
                <button onClick={() => handleJoin(workshop)}>
                  Join Session ✅
                </button>
              )
            )}
          </div>
        ))}
      </div>

      {selectedWorkshop && (
        <div className="popup">
          <div className="popup-content">
            <h3>Register for {selectedWorkshop.title}</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>Confirm</button>
            <button onClick={() => setSelectedWorkshop(null)}>Cancel</button>
          </div>
        </div>
      )}

      {viewWorkshop && (
        <div className="popup">
          <div className="popup-content">
            <h3>{viewWorkshop.title}</h3>
            <p>{viewWorkshop.description}</p>
            <button onClick={() => setViewWorkshop(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workshops;