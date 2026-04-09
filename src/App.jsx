import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Pages
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
import MyRegistrations from "./pages/MyRegistrations";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SuccessStories from "./pages/SuccessStories"; // 🔥 NEW

function App() {
  return (
    <Router>

      {/* 🔥 BACKGROUND (BUBBLES + ICONS) */}
      <div className="background">

        {/* 🔵 BUBBLES */}
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>

        {/* 💻 ICONS (20) */}
        <span className="icon">💻</span>
        <span className="icon">📚</span>
        <span className="icon">⚙️</span>
        <span className="icon">π</span>
        <span className="icon">√</span>
        <span className="icon">🧠</span>
        <span className="icon">📖</span>
        <span className="icon">🖥️</span>
        <span className="icon">📊</span>
        <span className="icon">📈</span>
        <span className="icon">🧑‍🏫</span>
        <span className="icon">📂</span>
        <span className="icon">📝</span>
        <span className="icon">📌</span>
        <span className="icon">🧾</span>
        <span className="icon">🔍</span>
        <span className="icon">🧮</span>
        <span className="icon">⌨️</span>
        <span className="icon">💡</span>
        <span className="icon">📡</span>
      </div>

      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content */}
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success-stories" element={<SuccessStories />} /> {/* 🔥 NEW */}
        </Routes>
      </div>

      {/* 🔥 Footer */}
      <Footer />
    </Router>
  );
}

export default App;