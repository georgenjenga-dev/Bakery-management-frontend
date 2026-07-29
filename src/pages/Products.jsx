import { useState } from "react";
import "./Products.css";

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: "Chocolate Cake",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
      description: "Rich chocolate sponge layered with creamy chocolate frosting."
    },
    {
      id: 2,
      name: "Croissant",
      price: 4.5,
      image:
        "https://images.unsplash.com/photo-1555507036-ab794f4afe5b?w=600",
      description: "Freshly baked buttery croissant with a flaky crust."
    },
    {
      id: 3,
      name: "Cupcake",
      price: 3,
      image:
        "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600",
      description: "Vanilla cupcake topped with smooth buttercream frosting."
    },
    {
      id: 4,
      name: "French Bread",
      price: 5,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
      description: "Crispy outside and soft inside, baked fresh every morning."
    },
    {
      id: 5,
      name: "Donuts",
      price: 2.5,
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
      description: "Soft donuts glazed with chocolate and vanilla icing."
    },
    {
      id: 6,
      name: "Cookies",
      price: 6,
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
      description: "Crunchy chocolate chip cookies baked daily."
    }
  ]);

  return (
    <div className="products-page">
      <h1>Our Bakery Products</h1>
      <p>Freshly baked treats made with love every day.</p>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className="product-info">
              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <h3>${product.price.toFixed(2)}</h3>

              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;