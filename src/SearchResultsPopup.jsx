import React from 'react';
import './SearchResultsPopup.css'; // Create this CSS file next

const SearchResultsPopup = ({ results, onClose, onProductClick }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>×</button>
        <h2>Search Results</h2>
        <div className="popup-results-grid">
          {results.length > 0 ? (
            results.map(product => (
              // When a product in the popup is clicked, we call the passed-in function
              <div 
                className="popup-product-card" 
                key={product.id} 
                onClick={() => onProductClick(product)}
              >
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.name}</p>
                <span>Rs. {product.price}</span>
              </div>
            ))
          ) : (
            <p className="popup-no-results">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPopup;