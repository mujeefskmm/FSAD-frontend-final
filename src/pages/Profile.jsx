import { useState } from "react";
import axios from "axios";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8081/api/users/${user.id}`,
        user
      );

      alert("Profile Updated Successfully ✅");

      setUser(res.data);

      // ✅ SAVE UPDATED USER
      localStorage.setItem("user", JSON.stringify(res.data));

      // 🔥 IMPORTANT FIX (NAVBAR AUTO UPDATE)
      window.dispatchEvent(new Event("storage"));

      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="container">
      <h1>Profile</h1>

      <div className="profile-card">

        {/* 🔥 PROFILE HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2>{user.name}</h2>
          <p className="profile-role">{user.role}</p>
        </div>

        {/* 🔹 PERSONAL INFO */}
        <h3>Personal Info</h3>

        <label>👤 Name:</label>
        <input
          type="text"
          name="name"
          value={user.name || ""}
          disabled={!isEditing}
          onChange={handleChange}
        />

        <label>📧 Email:</label>
        <input
          type="email"
          name="email"
          value={user.email || ""}
          disabled={!isEditing}
          onChange={handleChange}
        />

        <label>🎭 Role:</label>
        <input type="text" value={user.role || ""} disabled />

        {/* 🔹 USER ONLY FIELDS */}
        {user.role === "user" && (
          <>
            <h3>Professional Info</h3>

            <label>🎓 College:</label>
            <input
              type="text"
              name="college"
              value={user.college || ""}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <label>💻 Skills:</label>
            <input
              type="text"
              name="skills"
              value={user.skills || ""}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <label>📝 Bio:</label>
            <input
              type="text"
              name="bio"
              value={user.bio || ""}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </>
        )}

        {/* 🔹 BUTTONS */}
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;