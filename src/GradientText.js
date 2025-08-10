// GradientText.js
import React from 'react';
import './GradientText.css'; // Import the component's own stylesheet

export default function GradientText({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 8,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  // We only need one element now, the CSS handles the text clipping
  return (
    <div
      className={`animated-gradient-text text-content ${className}`}
      style={gradientStyle}
    >
      {children}
    </div>
  );
}