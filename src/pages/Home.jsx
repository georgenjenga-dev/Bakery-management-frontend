import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Freshly Baked Every Day</h1>

          <p>
            Discover our delicious cakes, artisan bread, pastries, cookies,
            and more. Made fresh every morning with the finest ingredients.
          </p>

          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Our Favorites</h2>

        <div className="featured-grid">
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
              alt="Chocolate Cake"
            />
            <h3>Chocolate Cake</h3>
            <p>$25.00</p>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"
              alt="Fresh Bread"
            />
            <h3>Fresh Bread</h3>
            <p>$5.00</p>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab794f4afe5b?w=500"
              alt="Croissant"
            />
            <h3>Croissant</h3>
            <p>$4.50</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Choose Sweet Crumbs?</h2>

        <p>
          We believe every bite should be memorable. Our skilled bakers prepare
          every loaf, pastry, and cake using fresh, high-quality ingredients to
          bring warmth and happiness to your table.
        </p>
      </section>
    </>
  );
}

export default Home;