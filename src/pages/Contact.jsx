import { useState } from "react";
import axios from "axios"; // ✅ ADDED

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ UPDATED FUNCTION (Backend connected)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/api/messages", form);

      alert("Message stored in database ✅");

      // ✅ Clear form after submit
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      console.log(error);
      alert("Error sending message ❌");
    }
  };

  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>

      {/* ✅ TITLE */}
      <h1
        style={{
          background: "linear-gradient(90deg, #38bdf8, #6366f1)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
      >
        📞 Contact Us
      </h1>

      <p style={{ marginTop: "10px" }}>
        We'd love to hear from you! Send us a message.
      </p>

      {/* ✅ FORM CARD */}
      <div
        style={{
          maxWidth: "500px",
          margin: "30px auto",
          padding: "30px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Send Message 🚀
          </button>
        </form>
      </div>

      {/* ✅ CONTACT INFO */}
      <div style={{ marginTop: "30px" }}>
        <p>📧 support@workshop.com</p>
        <p>📞 +91 9876543210</p>
        <p>📍 India</p>
      </div>
    </div>
  );
}

// ✅ INPUT STYLE
const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white"
};

// ✅ BUTTON STYLE
const buttonStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #38bdf8, #6366f1)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s"
};

export default Contact;