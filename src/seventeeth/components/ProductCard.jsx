// src/components/ProductCard.js - Product card component for displaying items
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart, showQuickAdd = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(product);
      // Simulate API call delay
      setTimeout(() => setIsAdding(false), 500);
    } catch (error) {
      setIsAdding(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image-container">
          <div className="product-image">
            <span className="product-emoji">{product.emoji}</span>
            
            {/* Sale Badge */}
            {product.onSale && (
              <div className="sale-badge">Sale</div>
            )}
            
            {/* New Badge */}
            {product.isNew && (
              <div className="new-badge">New</div>
            )}
            
            {/* Quick Add Button */}
            {showQuickAdd && (
              <button 
                className={`quick-add-btn ${isHovered ? 'visible' : ''} ${isAdding ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? '✓' : '+'}
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          {/* Brand and Category */}
          <div className="product-meta">
            <span className="product-brand">{product.brand}</span>
            <span className="product-category">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="product-name">{product.name}</h3>
          
          {/* Product Description */}
          <p className="product-description">{product.description}</p>

          {/* Price Section */}
          <div className="product-pricing">
            {product.originalPrice ? (
              <div className="price-with-discount">
                <span className="current-price">{formatPrice(product.price)}</span>
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                <span className="discount-badge">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </div>
            ) : (
              <span className="current-price">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {'⭐'.repeat(Math.floor(product.rating))}
                {product.rating % 1 >= 0.5 && '⭐'}
                <span className="rating-value">({product.rating})</span>
              </div>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
          )}

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="color-options">
              <span className="color-label">Colors:</span>
              <div className="color-dots">
                {product.colors.slice(0, 4).map((color, index) => (
                  <span 
                    key={index} 
                    className="color-dot"
                    style={{ 
                      backgroundColor: color.toLowerCase(),
                      border: color.toLowerCase() === 'white' ? '1px solid #ccc' : 'none'
                    }}
                    title={color}
                  ></span>
                ))}
                {product.colors.length > 4 && (
                  <span className="color-more">+{product.colors.length - 4}</span>
                )}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && (
            <div className="size-options">
              <span className="size-label">Sizes: {product.sizes.join(', ')}</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <span className="loading-spinner"></span>
                Adding...
              </>
            ) : (
              <>
                <span className="cart-icon">🛒</span>
                Add to Cart
              </>
            )}
          </button>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="wishlist-btn" title="Add to wishlist">
              ♡
            </button>
            <button className="compare-btn" title="Add to compare">
              ⇄
            </button>
            <button className="quick-view-btn" title="Quick view">
              👁️
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;