import React, { useState, useEffect } from "react";
import "./ProductList.css";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading delicious products...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>Error loading products: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className="product-page">
      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                />
                {/* <span className="product-category-badge">
                  {product.category}
                </span> */}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-meta">
                  <span className="product-rating">
                    {Array(Math.round(product.rating.rate))
                      .fill()
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}{" "}
                    ({product.rating.count})
                  </span>
                  <span className="product-price">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  className="add-btn"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.title} to cart`}
                >
                  <span></span> Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
