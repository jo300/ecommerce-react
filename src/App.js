import React, { useState } from "react";
import ProductList from "../src/components/ProductList/ProductList";
import Cart from "../src/components/Cart/Cart";
import Checkout from "../src/components/Checkout/Checkout";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import banner1 from "./assets/images/banner1.jpg";
import banner3 from "./assets/images/banner3.jpg";
import banner2 from "./assets/images/banner2.jpg";

import BannerCarousel from "../src/components/BannerCarousel/BannerCarousel";
const bannerImages = [
  {
    url: banner1,
    alt: "Summer Sale",
  },
  {
    url: banner2,
    alt: "New Arrivals",
  },
  {
    url: banner3,
    alt: "Special Offers",
  },
];
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const goToCheckout = () => {
    closeCart();
    navigate("/checkout", { state: { cartItems } });
  };
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BannerCarousel images={bannerImages} />
              <ProductList addToCart={addToCart} />
              <button className="checkout-btn" onClick={openCart}>
                🛒 Cart{" "}
                {cartItems.length > 0 && (
                  <span className="cart-count-badge">
                    {cartItems.reduce((total, item) => total + item.qty, 0)}
                  </span>
                )}
              </button>
              {cartOpen && (
                <Cart
                  cartItems={cartItems}
                  updateCart={updateCart}
                  closeCart={closeCart}
                  goToCheckout={goToCheckout}
                />
              )}
            </>
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} clearCart={clearCart} />}
          state={{ cartItems }} // Pass cart items via route state
        />
      </Routes>
    </>
  );
}

export default App;
