// src/CartModal.jsx

import React from 'react';
import './CartModal.css'; // This line imports the CSS file we'll create next

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, total }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>Your Cart</h2>
          <button className="cart-modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <p className="cart-empty-text">Your cart is empty</p>
          ) : (
            <>
              <ul className="cart-items-list-modal">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item-modal">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image-modal" />
                    <div className="cart-item-info-modal">
                      <h4>{item.name}</h4>
                      <p>Rs. {item.price}</p>
                    </div>
                    <div className="cart-item-controls-modal">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="cart-item-remove-modal" onClick={() => onRemoveItem(item.id)}>×</button>
                  </li>
                ))}
              </ul>
              <div className="cart-total-modal">
                Total: Rs. {total}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;