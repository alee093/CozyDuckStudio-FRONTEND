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
  const [showDelayMessage, setShowDelayMessage] =
  useState(false);

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
  const cleanEmail = formData.email
    .trim()
    .toLowerCase();

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

  let timeoutId;

  try {
    setLoading(true);
    setShowDelayMessage(false);

    timeoutId = setTimeout(() => {
      setShowDelayMessage(true);
    }, 5000);

    const response = await fetch(
      "/api/subscribe",
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
    clearTimeout(timeoutId);
    setShowDelayMessage(false);
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
        {/*
        <div className="description-container">
          <div className="description-box">
            <i class="bi bi-heart"></i>
            <p> EXCLUSIVE ART</p>
            <span>
              Original devil duck designs only for our subscribers.
            </span>
          </div>
          <div className="description-box">
            <i class="bi bi-film"></i>
            <p>SNEAK PEAKS</p>
            <span>
              Behind-the-scenes content, and early looks at new
              projects.
            </span>
          </div>
          <div className="description-box">
            <i class="bi bi-gift"></i>
            <p>FREEBIES & POLLS</p>
            <span>
              Vote on new ideas and get special subscriber perks.
            </span>
          </div>
          <div className="description-box">
            <i class="bi bi-star"></i>
            <p>FIRST ACCESS</p>
            <span>
              Be the first to know about new drops and collections.
            </span>
          </div>
        </div>
        */}
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
          {showDelayMessage && (
            <p className="loading-message">
              The ducks are working on it 🦆
              <br />
              Your wallpaper is on its way, but it may take a
              few seconds.
              <br />
              If you don't see it, check your Promotions folder.
            </p>
          )}
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
