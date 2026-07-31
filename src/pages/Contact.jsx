import { useState } from "react";
import "./Contact.css";
import api from "../api/axiosConfig";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      await api.post("/contact", {
        full_name: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      setStatus({
        loading: false,
        success: "Thank you! Your message has been sent successfully. We will get back to you soon.",
        error: null
      });
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Failed to send contact message:", err);
      setStatus({
        loading: false,
        success: null,
        error: err.response?.data?.message || "Failed to send message. Please try again later."
      });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Sweet Delicacy Bakery</h1>
        <p>
          We'd love to hear from you! Whether you have a question, want to place
          a custom cake order, or simply want to say hello, we're here to help.
        </p>
      </div>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>

          {status.success && (
            <div style={{ color: "#28a745", padding: "10px", marginBottom: "15px", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
              {status.success}
            </div>
          )}

          {status.error && (
            <div style={{ color: "#d9534f", padding: "10px", marginBottom: "15px", backgroundColor: "#fde8e8", borderRadius: "4px" }}>
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={status.loading}>
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Visit Our Bakery</h2>

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>123 Bakery Street</p>
            <p>Nairobi, Kenya</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+254 716 323 929</p>
          </div>

          <div className="info-box">
            <h3>✉ Email</h3>
            <p>info@sweetdelicacybakery.com</p>
          </div>

          <div className="info-box">
            <h3>🕒 Opening Hours</h3>
            <p>Monday – Friday: 7:00 AM – 7:00 PM</p>
            <p>Saturday: 8:00 AM – 6:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="map-section">
        <h2>Find Us</h2>

        <iframe
          title="Bakery Location"
          src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;