import { useState, useEffect } from "react";
import "./Products.css";
import { useCart } from '../context/cartcontext';
import api from '../api/axiosConfig';

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 1500,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    description: "Rich chocolate sponge layered with creamy chocolate frosting."
  },
  {
    id: 2,
    name: "Croissant",
    price: 180,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoAfVdKKxy4oIF9yOGG7mYNm7URUao4-uDeTO4uj2Syw&s=10",
    description: "Freshly baked buttery croissant with a flaky crust."
  },
  {
    id: 3,
    name: "Vanilla Cupcake",
    price: 150,
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600",
    description: "Vanilla cupcake topped with smooth buttercream frosting."
  },
  {
    id: 4,
    name: "French Bread",
    price: 60,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    description: "Crispy outside and soft inside, baked fresh every morning."
  },
  {
    id: 5,
    name: "Donuts",
    price: 120,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
    description: "Soft donuts glazed with chocolate and vanilla icing."
  },
  {
    id: 6,
    name: "Cookies",
    price: 100,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
    description: "Crunchy chocolate chip cookies baked daily."
  }
];

function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products');
        const rawData = res.data?.data || res.data;
        if (Array.isArray(rawData) && rawData.length > 0) {
          setProducts(rawData);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
        setError("Unable to connect to live backend. Showing catalog items.");
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <h1>Our Bakery Products</h1>
      <p>Freshly baked treats made with love every day.</p>

      {error && <div style={{ color: '#d9534f', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading fresh bakery items...</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image || product.image_url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600'} alt={product.name} />

              <div className="product-info">
                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <h3>KSH {Number(product.price).toFixed(2)}</h3>

                <button type="button" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;