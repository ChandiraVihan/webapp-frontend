// BentoGrid.js (Corrected for Standard CSS)
import React from "react";

export const BentoGrid = ({ className, children }) => {
  // Use a simple, predictable class name.
  const combinedClassName = `bento-grid ${className || ''}`;

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, item }) => {
  // Use a simple, predictable class name.
  const combinedClassName = `bento-grid-item ${className || ''}`;

  return (
    <div
      className={combinedClassName}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {item}
    </div>
  );
};