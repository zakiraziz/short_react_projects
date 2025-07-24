// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

export default function ProductCard({ product, addToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="product-badges">
        {product.onSale && (
          <span className="badge sale-badge">SALE</span>
        )}
        {product.isNew && (
          <span className="badge new-badge">NEW</span>
        )}
        <button 
          className="favorite-btn"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img 
            src={isHovered && product.images?.[1] ? product.images[1] : product.image} 
            alt={product.name} 
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          {product.rating && (
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  color={i < product.rating ? '#ffc107' : '#e4e5e9'} 
                  size={14}
                />
              ))}
              <span>({product.reviewCount})</span>
            </div>
          )}
          <div className="price">
            {product.onSale ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="sale-price">${product.salePrice}</span>
              </>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <div className="low-stock">Only {product.stock} left!</div>
          )}
          {product.stock === 0 && (
            <div className="out-of-stock">Out of Stock</div>
          )}
        </div>
      </Link>

      <motion.button 
        className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
        whileTap={{ scale: 0.95 }}
      >
        {isAdding ? (
          'Adding...'
        ) : (
          <>
            <FaShoppingCart /> 
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </>
        )}
      </motion.button>

      {product.freeShipping && (
        <div className="free-shipping">Free Shipping</div>
      )}
    </motion.div>
  );
}
