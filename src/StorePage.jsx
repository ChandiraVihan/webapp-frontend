import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StorePage.css";
import GradientText from './GradientText';
import Aurora from './Aurora';
import RotatingText from './RotatingText';
import AddProductModal from './AddProductModal';
import ProductDetail from './ProductDetail';
import searchIcon from './search-icon.svg';
import cartIcon from './cart-icon.svg';
import menuIcon from './menu-icon.svg';
import SearchResultsPopup from './SearchResultsPopup';
import CartModal from './CartModal'; // Make sure this component exists

const StorePage = () => {
  // State for products and UI
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // For "Add Product"
  const [selectedProduct, setSelectedProduct] = useState(null); // For product details
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // State for cart and its UI elements
  const [cartItems, setCartItems] = useState([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const userRole = localStorage.getItem('userRole');

  // Fetch all products from the server
  const fetchProducts = () => {
    axios.get("http://localhost:8081/api/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setError("Could not load products. Please try again later.");
        setLoading(false);
      });
  };

  // --- UI CONTROL FUNCTIONS ---

  // Toggles the sliding panel open and closed
  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  // Opens the cart modal and closes the slider for a clean transition
  const handleCartButtonClick = () => {
    setIsCartModalOpen(true);
    setIsSliderOpen(false);
  };

  // --- CART MANAGEMENT FUNCTIONS ---

  // Adds a product to the cart or increments its quantity, then shows a confirmation message
  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === productToAdd.id);
      if (isItemInCart) {
        // If item exists, map over array and update quantity for the matching product
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If item doesn't exist, add it to the end of the array with quantity 1
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });

    // Show the "Added to cart!" toast message
    setShowToast(true);
    // Set a timer to hide the toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  // Removes an item completely from the cart, regardless of quantity
  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Updates the quantity of a specific item in the cart
  const handleUpdateQuantity = (productId, amount) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity + amount;
            // Return the item with the new quantity
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        // Filter out any items where the quantity has dropped to 0 or less
        .filter(item => item.quantity > 0)
    );
  };

  // Calculates the total price of all items in the cart
  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // --- OTHER HANDLER FUNCTIONS ---

  // Deletes a product (Admin only)
  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8081/api/products/${productId}`);
        fetchProducts(); // Refresh the product list
      } catch (err) {
        alert("Error: Could not delete the product.");
      }
    }
  };

  // Opens the product detail view when a card is clicked
  const handleProductClick = (e, product) => {
    // Prevent this from firing if a button on the card was clicked
    if (e.target.closest('button')) return;
    setSelectedProduct(product);
  };

  // Handles the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowSearchResults(true);
  };

  // Handles clicking on a product from the search results pop-up
  const handlePopupProductClick = (product) => {
    setShowSearchResults(false);
    setSelectedProduct(product);
  };

  // Fetch products when the component first loads
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading-message">Loading Products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="store-container">
      {/* Conditionally render the toast notification */}
      {showToast && <div className="add-to-cart-toast">Added to cart!</div>}

      {/* Header and background elements */}
      {userRole === 'admin' && ( <button className="add-product-btn" onClick={() => setIsProductModalOpen(true)}> + Add Product </button> )}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}> <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} /> </div>
      <h2 className="store-title"> <GradientText colors={["#ff9966", "#ff5e62", "#ff9966", "#ff5e62", "#ff9966"]} animationSpeed={2}> NexaCore </GradientText> </h2>
      <div className="rotating-text-container"> <RotatingText texts={[ 'Tomorrow s Tech, Today.', 'Elevate Your Setup', 'Unleash Your Potential', 'The Best in Tech, Curated for the Core.', 'The Heart of Your Digital World.' ]} staggerFrom={"last"} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-120%" }} staggerDuration={0.025} splitLevelClassName="overflow-hidden pb-0.5" transition={{ type: "spring", damping: 30, stiffness: 400 }} rotationInterval={2000} /> </div>
      {userRole === 'customer' && ( <form className="search-bar-container" onSubmit={handleSearch}> <input className="search-input" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> <div className="search-separator"></div> <button type="submit" className="search-button"> <img src={searchIcon} alt="Search" /> </button> </form> )}
      
      {/* --- The Sliding Panel UI --- */}
      {userRole === 'customer' && (
        <>
          <div className={`menu-container ${isSliderOpen ? 'slider-open' : ''}`}>
            <button className="menu-button" onClick={toggleSlider}>
              <img src={menuIcon} alt="Menu" /> 
            </button> 
          </div>

          <div className={`cart-slider ${isSliderOpen ? 'active' : ''}`}>
            <button className="cart-button" onClick={handleCartButtonClick}>
              <img src={cartIcon} alt="Shopping Cart" />
            </button>
          </div>

          {isSliderOpen && <div className="slider-overlay" onClick={toggleSlider}></div>}
        </>
      )}

      {/* --- The Product Grid --- */}
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id} onClick={(e) => handleProductClick(e, product)}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Rs. {product.price}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            <div className="action-buttons">
              {userRole === 'customer' && (
                <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                  Add to Cart
                </button>
              )}
              {userRole === 'admin' && ( <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button> )}
            </div>
          </div>
        ))}
      </div>
      
      {/* --- Hidden Modals that appear when needed --- */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        total={getCartTotal()}
      />
      
      <AddProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onProductAdded={fetchProducts} />
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />
      {showSearchResults && <SearchResultsPopup results={filteredProducts} onClose={() => setShowSearchResults(false)} onProductClick={handlePopupProductClick} />}
    </div>
  );
};

export default StorePage;
