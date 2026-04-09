function Footer() {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        padding: "30px 20px",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      {/* 🔷 PROJECT NAME */}
      <h2 style={{ marginBottom: "10px" }}>Workshop Platform</h2>

      {/* 🔷 TAGLINE */}
      <p style={{ color: "#aaa" }}>Learn. Build. Grow.</p>

      {/* 🔗 LINKS */}
      <div style={{ margin: "20px 0" }}>
        <a href="/" style={{ margin: "0 10px", color: "#ccc" }}>Home</a>
        <a href="/about" style={{ margin: "0 10px", color: "#ccc" }}>About</a>
        <a href="/contact" style={{ margin: "0 10px", color: "#ccc" }}>Contact</a>
      </div>

      {/* 📧 CONTACT */}
      <p>Email: support@workshop.com</p>

      {/* 🌐 SOCIAL (simple text icons) */}
      <div style={{ marginTop: "10px" }}>
        <span style={{ margin: "0 10px" }}>🌐</span>
        <span style={{ margin: "0 10px" }}>📘</span>
        <span style={{ margin: "0 10px" }}>📸</span>
      </div>

      {/* 📄 COPYRIGHT */}
      <p style={{ marginTop: "15px", fontSize: "14px", color: "#777" }}>
        © 2026 Workshop Platform. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;