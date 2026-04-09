function SuccessStories() {
  const stories = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    message: "This platform helped me land my first job at a startup 🚀",
  },
  {
    name: "Priya Reddy",
    role: "UI/UX Designer",
    message: "Amazing workshops! I improved my design skills a lot 🎨",
  },
  {
    name: "Arjun Kumar",
    role: "Backend Developer",
    message: "The hands-on training made me confident in Spring Boot 💻",
  },
  {
    name: "Sneha Patel",
    role: "Data Analyst",
    message: "Data science sessions were very practical and helpful 📊",
  },
  {
    name: "Vikram Singh",
    role: "Full Stack Developer",
    message: "Loved the real-time projects, helped me build my portfolio 🔥",
  },
  {
    name: "Anjali Mehta",
    role: "Software Engineer",
    message: "The mentors explained concepts very clearly and patiently 👩‍🏫",
  },
  {
    name: "Karthik R",
    role: "Cloud Engineer",
    message: "Cloud workshops boosted my confidence in AWS ☁️",
  },
  {
    name: "Meena Iyer",
    role: "QA Tester",
    message: "Testing sessions helped me understand automation tools 🧪",
  },
  {
    name: "Rohit Verma",
    role: "DevOps Engineer",
    message: "CI/CD and Docker sessions were extremely useful ⚙️",
  },
  {
    name: "Divya Nair",
    role: "Mobile App Developer",
    message: "The Android development workshop was very engaging 📱",
  },
  {
  name: "Sneha Patel",
  role: "Data Analyst",
  message: "Data science sessions were very practical and helped me land an internship 📊"
},
{
  name: "Vikram Singh",
  role: "Full Stack Developer",
  message: "Loved the real-time projects! Helped me build a strong portfolio 🔥"
}
  
];

  return (
    <div className="container">
      <h1>Success Stories</h1>

      <div className="stories-grid">
        {stories.map((s, index) => (
          <div key={index} className="story-card">
            <h3>{s.name}</h3>
            <p className="role">{s.role}</p>
            <p>"{s.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessStories;