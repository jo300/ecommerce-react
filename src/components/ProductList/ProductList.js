import React, { useState, useEffect, useMemo } from "react";
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
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        setProducts(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, categoryFilter]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="product-page">
      <ProductControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      <ProductGrid
        products={filteredProducts}
        addToCart={addToCart}
        onClearFilters={() => {
          setSearchTerm("");
          setCategoryFilter("all");
        }}
      />
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading delicious products...</p>
  </div>
);

const ErrorDisplay = ({ error }) => (
  <div className="error-container">
    <p>Error loading products: {error}</p>
    <button onClick={() => window.location.reload()}>Retry</button>
  </div>
);

const ProductControls = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
}) => (
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
);

const ProductGrid = ({ products, addToCart }) => (
  <div className="product-grid">
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))
    ) : (
      <NoResults />
    )}
  </div>
);

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <div className="product-image-container">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
        loading="lazy"
      />
    </div>
    <div className="product-info">
      <h3 className="product-title">{product.title}</h3>
      <ProductMeta product={product} />
      <button
        className="add-btn"
        onClick={() => addToCart(product)}
        aria-label={`Add ${product.title} to cart`}
      >
        Add
      </button>
    </div>
  </div>
);

const ProductMeta = ({ product }) => (
  <div className="product-meta">
    <span className="product-rating">
      {"★".repeat(Math.round(product.rating.rate))} ({product.rating.count})
    </span>
    <span className="product-price">${product.price.toFixed(2)}</span>
  </div>
);

const NoResults = ({ onClearFilters }) => (
  <div className="no-results">
    <p>No products found matching your criteria.</p>
    <button onClick={onClearFilters}>Clear filters</button>
  </div>
);

export default ProductList;
