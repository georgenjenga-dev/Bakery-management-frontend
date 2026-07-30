import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🧁</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any delicious cakes yet!</p>
          <button className="btn-browse" onClick={() => navigate('/products')}>
            Browse Cakes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image_url || item.image || '/placeholder-cake.jpg'} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">KES {item.price.toLocaleString()}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="cart-item-subtotal">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
            
            <button 
              className="btn-proceed"
              onClick={() => navigate('/orders')}
            >
              Proceed to Order →
            </button>
            
            <button 
              className="btn-continue"
              onClick={() => navigate('/products')}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;