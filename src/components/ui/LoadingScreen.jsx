import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isExiting }) => {
  // To preserve the UI design and logic, let's make it look smoother.
  return (
    <div className={`loading-screen ${isExiting ? 'fade-out' : ''}`}>
      <div className="loader-container">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-logo">AD</div>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
