import React from "react";
import "./Cart.css";

function Cart({ cartItems, updateCart, closeCart, goToCheckout }) {
  const handleAdd = (productId) => {
    updateCart(
      cartItems.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleRemove = (productId) => {
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem.qty > 1) {
      updateCart(
        cartItems.map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
      );
    } else {
      updateCart(cartItems.filter((item) => item.id !== productId));
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-popup">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <button
          className="close-cart"
          onClick={closeCart}
          aria-label="Close cart"
        >
          &times;
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={closeCart}>Continue Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Reduce quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="quantity">{item.qty}</span>
                    <button
                      onClick={() => handleAdd(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
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
              className="checkout-button"
              onClick={goToCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
