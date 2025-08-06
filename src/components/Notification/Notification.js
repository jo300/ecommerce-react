import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible || !message) return null;

  return <div className="notification-badge">{message}</div>;
};

export default Notification;
