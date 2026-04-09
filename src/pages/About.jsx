function About() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      
      {/* ✅ TITLE WITH GRADIENT */}
      <h1
        style={{
          background: "linear-gradient(90deg, #38bdf8, #6366f1)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        🚀 About Workshop Platform
      </h1>

      <p style={{ maxWidth: "700px", margin: "20px auto" }}>
        Workshop Platform is designed to help students and professionals
        enhance their skills through interactive online workshops.
        Learn from expert trainers, participate in sessions, and grow your career.
      </p>

      {/* ✅ MISSION */}
      <div style={{ marginTop: "50px" }}>
        <h2>Our Mission</h2>

        <hr
          style={{
            width: "60px",
            margin: "10px auto",
            border: "2px solid #38bdf8",
          }}
        />

        <p>
          To provide accessible and high-quality learning experiences
          for everyone through online workshops.
        </p>
      </div>

      {/* ✅ FEATURES */}
      <div style={{ marginTop: "50px" }}>
        <h2>What We Offer</h2>

        <hr
          style={{
            width: "60px",
            margin: "10px auto",
            border: "2px solid #38bdf8",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3>📚 Workshops</h3>
            <p>Wide range of technical and non-technical workshops.</p>
          </div>

          {/* CARD 2 */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3>🎓 Certification</h3>
            <p>Earn certificates after completing sessions.</p>
          </div>

          {/* CARD 3 */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3>💬 Live Interaction</h3>
            <p>Ask questions and interact with trainers live.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ CARD STYLE (UPDATED)
const cardStyle = {
  background: "rgba(255,255,255,0.1)",
  padding: "20px",
  borderRadius: "12px",
  width: "250px",
  backdropFilter: "blur(10px)",
  transition: "0.3s",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
};

export default About;