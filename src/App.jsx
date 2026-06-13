import "./App.css";
import { useState } from "react";
import logo from "./assets/logo.png";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();

    const nameRegex = /^[\p{L}\s]+$/u;

    if (cleanName.length < 3) {
      setMessage("Name: Min 3 characters.");
      return;
    }

    if (!nameRegex.test(cleanName)) {
      setMessage("Letters only.");
      return;
    }

    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
        });
      }
    } catch (error) {
      console.log(error);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-container">
        <h1 className="title">Cozy Duck Studio</h1>

        <div className="divider">
          <hr className="line line-left" />

          <img
            className="logo"
            src={logo}
            alt="Cozy Duck Studio Logo"
          />

          <hr className="line line-right" />
        </div>

        <h2 className="subtitle">
          FREE DEVIL DUCK PHONE WALLPAPER
        </h2>

        <p className="description">
          Fresh out the duck pond and straight into the
          meadow. Get an exclusive duck wallpaper instantly,
          plus behind-the-scenes art, new duck drops, polls,
          freebies, and first access to new collections ♡
        </p>
      </div>

      <div className="form-container">
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="input-container">
            <label>Name</label>

            <i className="bi bi-person"></i>

            <input
              type="text"
              placeholder="Name..."
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
              autoComplete="off"
              minLength={3}
              maxLength={50}
            />
          </div>

          <div className="input-container">
            <label>Email</label>

            <i className="bi bi-envelope"></i>

            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              autoComplete="off"
              maxLength={100}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "GET FREE WALLPAPER"}
          </button>
        </form>

        <p className="privacy">
          <i className="bi bi-lock"></i>
          We respect your privacy. No spam, ever.
        </p>

        {message && (
          <div
            className={`message-container ${
              message.includes("Something went wrong") ||
              message.includes("Min") ||
              message.includes("Letters") ||
              message.includes("already")
                ? "error"
                : "success"
            }`}
          >
            <button
              className="close-button"
              onClick={() => setMessage("")}
            >
              <i className="bi bi-x"></i>
            </button>

            <p className="message">{message}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
