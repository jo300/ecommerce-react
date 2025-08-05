import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear the cart
      clearCart();

      // Show success message
      alert(
        `Order placed successfully!\nTotal: €${(totalPrice + 2.99).toFixed(2)}`
      );

      // Redirect to home page
      navigate("/");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-container">
      {/* ... existing checkout JSX ... */}
      <button
        className={`place-order-btn ${isPlacingOrder ? "processing" : ""}`}
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0 || isPlacingOrder}
      >
        {isPlacingOrder ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;
