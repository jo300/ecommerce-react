import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import banner1 from "./assets/images/banner1.jpg";
import banner2 from "./assets/images/banner2.jpg";
import banner3 from "./assets/images/banner3.jpg";
import "./App.css";
import Notification from "./components/Notification/Notification";
import Navbar from "./components/Navbar/Navbar";

const bannerImages = [
  { url: banner1, alt: "Summer Sale" },
  { url: banner2, alt: "New Arrivals" },
  { url: banner3, alt: "Special Offers" },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(
    location.state?.notification || ""
  );
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      // Clear the state so it doesn't show again on refresh
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const updateCart = useCallback((updatedItems) => {
    setCartItems(updatedItems);
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      const updatedItems = exists
        ? prevItems.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prevItems, { ...product, qty: 1 }];
      const itemName =
        product.title.length > 15
          ? `${product.title.substring(0, 15)}...`
          : product.title;
      setNotification(
        `${exists ? "Increased" : "Added"} "${itemName}" to cart`
      );

      return updatedItems;
    });
  }, []);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearCart();
      setNotification("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const clearCart = useCallback(() => setCartItems([]), []);

  const goToCheckout = useCallback(() => {
    closeCart();
    navigate("/checkout", { state: { cartItems } });
  }, [cartItems, closeCart, navigate]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <Navbar />
            <Notification message={notification} />
            <BannerCarousel images={bannerImages} />
            <ProductList addToCart={addToCart} />
            <button className="checkout-btn" onClick={openCart}>
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="cart-count-badge">{cartItemCount}</span>
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
          </div>
        }
      />
      <Route
        path="/checkout"
        element={<Checkout cartItems={cartItems} clearCart={clearCart} />}
      />
    </Routes>
  );
}

export default App;
