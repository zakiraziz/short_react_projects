// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductCard({ product, addToCart, isInCart }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product);
      // Success feedback is handled by the addToCart function or parent component
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const calculateDiscount = () => {
    if (!product.onSale) return 0;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
  };

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <div className="product-image">
            {!imageError ? (
              <img 
                src={product.image} 
                alt={product.name}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`product-img ${imageLoaded ? 'loaded' : 'loading'}`}
              />
            ) : (
              <div className="image-placeholder">
                <span>No Image</span>
              </div>
            )}
            
            {product.onSale && (
              <span className="sale-badge">
                SALE
                {calculateDiscount() > 0 && (
                  <span className="discount-percent">-{calculateDiscount()}%</span>
                )}
              </span>
            )}
            
            {product.isNew && <span className="new-badge">NEW</span>}
            
            {product.stockStatus === 'out-of-stock' && (
              <div className="out-of-stock-overlay">
                <span>Out of Stock</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          {product.category && (
            <p className="product-category">{product.category}</p>
          )}
          
          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index}
                    className={`star ${index < Math.floor(product.rating) ? 'filled' : ''} ${
                      index < product.rating && index >= Math.floor(product.rating) ? 'half-filled' : ''
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">({product.rating})</span>
            </div>
          )}
          
          <div className="price-container">
            {product.onSale ? (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="sale-price">${product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="current-price">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {product.shortDescription && (
            <p className="product-description">{product.shortDescription}</p>
          )}
        </div>
      </Link>
      
      <div className="product-actions">
        <button 
          className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''} ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding || product.stockStatus === 'out-of-stock'}
          aria-label={isInCart ? 'Product in cart' : 'Add to cart'}
        >
          {isAdding ? (
            <span className="loading-spinner"></span>
          ) : isInCart ? (
            '✓ In Cart'
          ) : product.stockStatus === 'out-of-stock' ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
        
        <button 
          className="wishlist-btn"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            // Add wishlist functionality here
          }}
        >
          ♡
        </button>
      </div>
      
      {product.featured && (
        <div className="featured-badge">Featured</div>
      )}
    </motion.div>
  );
}
