// PopupMessage.jsx

import React, { useState, useEffect } from 'react';
import './PopupMessageStyle.css';

const PopupMessage = ({ message, isError }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`popup-message ${isError ? 'error' : ''} ${isVisible ? 'visible' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default PopupMessage;
