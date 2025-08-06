import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cartItems, clearCart }) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearCart();
      alert(
        `Order placed successfully!\nTotal: $${(totalPrice + 2.99).toFixed(2)}`
      );
      navigate("/");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.qty}</p>
                  <p>Price: ${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$2.99</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(totalPrice + 2.99).toFixed(2)}</span>
            </div>
            <button
              className={`place-order-btn ${
                isPlacingOrder ? "processing" : ""
              }`}
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0 || isPlacingOrder}
            >
              {isPlacingOrder ? "Processing..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
