import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;
    setSuccessMessage("");

    // ✅ Validation
    if (!email.trim()) {
      setEmailError("Please enter your email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const res = await axios.post("https://fsad-backend-final-epfs.onrender.com/api/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ FIX: always take user from response
      if (!res.data.success) {
        alert(res.data.message || "Login failed ❌");
        return;
      }

      const userData = res.data.user;

      // ✅ Safety check
      if (!userData || !userData.role) {
        alert("Invalid login response ❌");
        return;
      }

      const formattedUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      };

      console.log("FINAL USER:", formattedUser);

      // ✅ Clear old data
      localStorage.removeItem("user");

      // ✅ Store new user
      localStorage.setItem("user", JSON.stringify(formattedUser));
      window.dispatchEvent(new Event("storage"));

      setSuccessMessage("Login Successful!");

      // ✅ Reset form
      setEmail("");
      setPassword("");

      // ✅ Redirect
      setTimeout(() => {
        if (formattedUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }, 500);

    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}

        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}

        <button type="submit">Login</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}

      <div className="form-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;