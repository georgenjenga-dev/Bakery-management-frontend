import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2> Sweet Crumbs Bakery</h2>
          <p>
            Freshly baked bread, cakes, pastries, and cookies made with love
            every single day.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>

          <p> Nairobi, Kenya</p>
          <p> +254 716 323 929</p>
          <p>info@sweetcrumbs.com</p>
        </div>

        <div className="footer-section">
          <h3>Opening Hours</h3>

          <p>Monday - Friday</p>
          <p>7:00 AM - 7:00 PM</p>

          <p>Saturday</p>
          <p>8:00 AM - 6:00 PM</p>

          <p>Sunday</p>
          <p>Closed</p>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2026 Sweet Crumbs Bakery. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;