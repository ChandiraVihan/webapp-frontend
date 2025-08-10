import React from 'react';
import './ProductDetail.css'; // We will create this CSS file next

const ProductDetail = ({ product, onClose, onAddToCart }) => {
  // If no product is selected, render nothing
  if (!product) {
    return null;
  }

  // Stop the click from propagating to the overlay behind it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

    const handleAddToCartClick = () => {
    onAddToCart(product);
    onClose(); // Optional: close the modal after adding to cart
  };

  return (
    // The full-screen overlay. Clicking this will close the detail view.
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-content" onClick={handleContentClick}>
        <button className="product-detail-close" onClick={onClose}>×</button>
        <div className="product-detail-image-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Rs. {product.price}</p>

           <button className="add-to-cart-btn-detail" onClick={handleAddToCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};




export default ProductDetail;