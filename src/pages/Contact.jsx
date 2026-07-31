import "./Contact.css";

function Contact() {
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

          <form>
            <input
              type="text"
              placeholder="Your Full Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              placeholder="Subject"
              required
            />

            <textarea
              rows="6"
              placeholder="Write your message here..."
              required
            ></textarea>

            <button type="submit">Send Message</button>
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