import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    {
      name: "Products",
      path: "/",
    },
    { name: "Contact", path: "/" },
  ];

  return (
    <nav className="navbar-overlay">
      <div className="nav-container">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="nav-item"
            onMouseEnter={() => setActiveMenu(item.name)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              to={item.path}
              className={`nav-link ${activeMenu === item.name ? "active" : ""}`}
            >
              {item.name}
            </Link>

            {item.submenu && activeMenu === item.name && (
              <div className="submenu">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem}
                    to={`/products/${subItem.toLowerCase().replace(" ", "-")}`}
                    className="submenu-link"
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
