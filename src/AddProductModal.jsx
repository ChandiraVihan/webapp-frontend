import React, { useState } from 'react';
import axios from 'axios';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Product name and price are required.');
      return;
    }
    setError('');

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      imageUrl
    };

    try {
      await axios.post('http://localhost:8081/api/products', newProduct);
      onProductAdded();
      onClose();
    } catch (err) {
      console.error("Failed to add product", err);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price (Rs.)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};




export default AddProductModal;