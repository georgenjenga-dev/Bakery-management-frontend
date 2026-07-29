import { useState } from "react";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chocolate Cake",
      price: 25.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
      id: 2,
      name: "Croissant",
      price: 4.5,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1555507036-ab794f4afe5b?w=500",
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>
          <p>Add some delicious bakery treats!</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="item-details">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <div className="item-total">
                <h3>${(item.price * item.quantity).toFixed(2)}</h3>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;