import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  // ✅ FIX: useState for user
  const [user, setUser] = useState(null);

  // ✅ THEME STATE
  const [theme, setTheme] = useState("dark");

  // ✅ LOAD USER + LISTEN FOR LOGIN
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    loadUser();

    // 🔥 EXISTING: listen for login/logout (different tabs)
    window.addEventListener("storage", loadUser);

    // 🔥 NEW: listen for profile update (same tab)
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  // ✅ APPLY THEME
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  // ✅ LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("user");

    // 🔥 trigger update
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        Workshop Platform
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/workshops">Workshops</NavLink>

        {user && user.role !== "admin" && (
          <NavLink to="/my-registrations">My Registrations</NavLink>
        )}

        {user && user.role === "admin" && (
          <NavLink to="/admin">Admin</NavLink>
        )}

        {user && <NavLink to="/profile">Profile</NavLink>}

        {!user && (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login" className="nav-btn">Login</NavLink>
<NavLink to="/signup" className="nav-btn">Signup</NavLink>
          </>
        )}

        {/* 🌗 THEME */}
        <span
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ marginLeft: "10px", cursor: "pointer", fontSize: "20px" }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </span>

        {/* ✅ USER INFO */}
        {user && (
          <>
            <span style={{ marginLeft: "10px", color: "white" }}>
              Hi, {user.name} ({user.role})
            </span>

            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;