import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workshop, setWorkshop] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [workshopError, setWorkshopError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!name) {
      setNameError("Please enter your full name");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Please enter your email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!workshop) {
      setWorkshopError("Please enter workshop name");
      valid = false;
    } else {
      setWorkshopError("");
    }

    if (valid) {
      setSuccessMessage("Registration Successful!");
      setName("");
      setEmail("");
      setWorkshop("");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className="form-container">
      <h2>Workshop Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="error">{nameError}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}

        <input
          type="text"
          placeholder="Workshop Name"
          value={workshop}
          onChange={(e) => setWorkshop(e.target.value)}
        />
        {workshopError && <p className="error">{workshopError}</p>}

        <button type="submit">Submit Registration</button>

        {successMessage && (
          <p className="success">{successMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Register;