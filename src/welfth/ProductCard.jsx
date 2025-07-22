// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ product, addToCart }) {
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.onSale && <span className="sale-badge">SALE</span>}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
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
        </div>
      </Link>
      <button 
        className="add-to-cart-btn" 
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </motion.div>
  );
}