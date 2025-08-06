import React, { useMemo } from "react";
import "./Cart.css";

const Cart = ({ cartItems, updateCart, closeCart, goToCheckout }) => {
  const handleAdd = (productId) => {
    updateCart(
      cartItems.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleRemove = (productId) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    existingItem.qty > 1
      ? updateCart(
          cartItems.map((item) =>
            item.id === productId ? { ...item, qty: item.qty - 1 } : item
          )
        )
      : updateCart(cartItems.filter((item) => item.id !== productId));
  };

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const shipping = 2.99;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [cartItems]);

  return (
    <div className="cart-popup">
      <CartHeader closeCart={closeCart} />
      {cartItems.length === 0 ? (
        <EmptyCart closeCart={closeCart} />
      ) : (
        <>
          <CartItems
            cartItems={cartItems}
            handleRemove={handleRemove}
            handleAdd={handleAdd}
          />
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            goToCheckout={goToCheckout}
          />
        </>
      )}
    </div>
  );
};

const CartHeader = ({ closeCart }) => (
  <div className="cart-header">
    <h2>Your Shopping Cart</h2>
    <button className="close-cart" onClick={closeCart} aria-label="Close cart">
      &times;
    </button>
  </div>
);

const EmptyCart = ({ closeCart }) => (
  <div className="empty-cart">
    <p>Your cart is empty</p>
    <button onClick={closeCart}>Continue Shopping</button>
  </div>
);

const CartItems = ({ cartItems, handleRemove, handleAdd }) => (
  <div className="cart-items-container">
    {cartItems.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        handleRemove={handleRemove}
        handleAdd={handleAdd}
      />
    ))}
  </div>
);

const CartItem = ({ item, handleRemove, handleAdd }) => (
  <div className="cart-item">
    <div className="item-image">
      <img src={item.image} alt={item.name} />
    </div>
    <div className="item-details">
      <h3 className="item-name">
        {item.description.substring(0, item.description.lastIndexOf(" ", 23))}
      </h3>
      <p className="item-price">${item.price.toFixed(2)}</p>
      <QuantityControls
        quantity={item.qty}
        onDecrease={() => handleRemove(item.id)}
        onIncrease={() => handleAdd(item.id)}
        itemName={item.name}
      />
    </div>
    <div className="item-total">${(item.price * item.qty).toFixed(2)}</div>
  </div>
);

const QuantityControls = ({ quantity, onDecrease, onIncrease, itemName }) => (
  <div className="quantity-controls">
    <button onClick={onDecrease} aria-label={`Reduce quantity of ${itemName}`}>
      −
    </button>
    <span className="quantity">{quantity}</span>
    <button
      onClick={onIncrease}
      aria-label={`Increase quantity of ${itemName}`}
    >
      +
    </button>
  </div>
);

const CartSummary = ({ subtotal, shipping, total, goToCheckout }) => (
  <div className="cart-summary">
    <div className="summary-row">
      <span>Subtotal:</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>
    <div className="summary-row">
      <span>Shipping:</span>
      <span>${shipping.toFixed(2)}</span>
    </div>
    <div className="summary-row total">
      <span>Total:</span>
      <span>${total.toFixed(2)}</span>
    </div>
    <button className="checkout-button" onClick={goToCheckout}>
      Proceed to Checkout
    </button>
  </div>
);

export default Cart;
