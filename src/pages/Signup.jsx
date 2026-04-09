import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminCode, setAdminCode] = useState(""); // 🔥 NEW

  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/api/auth/signup", {
        name,
        email,
        password,
        role,
        adminCode // 🔥 send admin code
      });

      console.log("Signup Response:", res.data);

      if (res.data.success) {
        setSuccessMessage("Account Created Successfully! ✅");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("user");
        setAdminCode("");
      } else {
        alert(res.data.message || "Signup failed ❌");
      }

    } catch (err) {
      console.log("Signup Error:", err);

      if (err.response && err.response.data) {
        alert(err.response.data.message || "Signup failed ❌");
      } else {
        alert("Server not reachable ❌");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* ROLE DROPDOWN */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select"
        >
          <option value="user">👤 User</option>
          <option value="admin">👑 Admin</option>
        </select>

        {/* 🔐 ADMIN CODE FIELD (ONLY FOR ADMIN) */}
        {role === "admin" && (
          <input
            type="text"
            placeholder="Enter Admin Code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            required
          />
        )}

        <button type="submit">Signup</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}

      <div className="form-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;