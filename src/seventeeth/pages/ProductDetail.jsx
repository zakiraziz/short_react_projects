// src/pages/ProductDetail.js - Single product detail page with gallery and options
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Sample product data - in real app, this would come from API
const productsData = [
  {
    id: 1,
    name: "Air Max Pulse",
    brand: "Nike",
    price: 129.99,
    originalPrice: 149.99,
    category: "lifestyle",
    emoji: "👟",
    description: "Modern comfort meets street-ready style. The Air Max Pulse delivers a sleek, streamlined design that's perfect for everyday wear while providing the iconic Air cushioning you love.",
    fullDescription: "The Nike Air Max Pulse brings the heritage of Air Max into a new era. With its minimalist design and maximum comfort, this shoe features a lightweight mesh upper, responsive Air cushioning, and a durable rubber outsole. Perfect for urban exploration and casual wear.",
    features: [
      "Air cushioning for all-day comfort",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Padded collar for ankle support",
      "Iconic Air Max design"
    ],
    specifications: {
      "Material": "Mesh, Synthetic Leather, Rubber",
      "Closure": "Lace-up",
      "Weight": "320g (per shoe)",
      "Suitable For": "Casual wear, Walking",
      "Technology": "Air Max cushioning"
    },
    rating: 4.5,
    reviewCount: 128,
    colors: [
      { name: "Black", value: "#000000", image: "👟" },
      { name: "White", value: "#FFFFFF", image: "👟" },
      { name: "Gray", value: "#808080", image: "👟" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    images: ["👟", "👟", "👟", "👟"],
    onSale: true,
    isNew: false,
    inStock: true,
    sku: "NIKE-AM-PULSE-001"
  }
];

const relatedProducts = [
  {
    id: 2,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 149.99,
    category: "running",
    emoji: "🏃",
    description: "Our lightest Ultraboost ever for maximum energy return",
    rating: 4.8,
    reviewCount: 89,
    colors: ["Blue", "Black", "White"],
    sizes: [6, 7, 8, 9, 10, 11],
    onSale: false,
    isNew: true
  },
  {
    id: 4,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 59.99,
    originalPrice: 69.99,
    category: "lifestyle",
    emoji: "👟",
    description: "The iconic sneaker that started it all",
    rating: 4.7,
    reviewCount: 312,
    colors: ["Black", "White", "Red", "Blue"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    onSale: true,
    isNew: false
  },
  {
    id: 6,
    name: "Air Force 1",
    brand: "Nike",
    price: 99.99,
    category: "lifestyle",
    emoji: "👟",
    description: "The classic that never goes out of style",
    rating: 4.9,
    reviewCount: 512,
    colors: ["White", "Black", "Red"],
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    onSale: false,
    isNew: false
  }
];

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]?.name || '');
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAddingToCart(true);
    try {
      const cartItem = {
        ...product,
        selectedColor,
        selectedSize,
        quantity
      };
      await addToCart(cartItem);
      
      // Show success feedback
      setTimeout(() => setIsAddingToCart(false), 1000);
    } catch (error) {
      setIsAddingToCart(false);
      alert('Error adding to cart');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart().then(() => {
      navigate('/cart');
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="product-main">
          {/* Product Images */}
          <div className="product-gallery">
            <div className="main-image">
              <div className="image-container">
                <span className="product-emoji-large">{product.images[activeImage]}</span>
                {product.onSale && (
                  <div className="sale-badge-large">Sale</div>
                )}
                {product.isNew && (
                  <div className="new-badge-large">New</div>
                )}
              </div>
            </div>

            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <span className="thumbnail-emoji">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-meta">
                <span className="product-brand">by {product.brand}</span>
                <span className="product-sku">SKU: {product.sku}</span>
              </div>

              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {'⭐'.repeat(Math.floor(product.rating))}
                  <span className="rating-value">{product.rating}</span>
                </div>
                <span className="review-count">({product.reviewCount} reviews)</span>
                <Link to="#reviews" className="see-reviews">See all reviews</Link>
              </div>
            </div>

            {/* Pricing */}
            <div className="product-pricing">
              {product.originalPrice ? (
                <div className="price-with-discount">
                  <span className="current-price">{formatPrice(product.price)}</span>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount-badge">-{discountPercentage}%</span>
                </div>
              ) : (
                <span className="current-price">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Color Selection */}
            <div className="product-option">
              <label className="option-label">Color: <strong>{selectedColor}</strong></label>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  >
                    <span 
                      className="color-swatch"
                      style={{ backgroundColor: color.value }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="product-option">
              <div className="option-header">
                <label className="option-label">Size: <strong>{selectedSize || 'Select Size'}</strong></label>
                <Link to="#size-guide" className="size-guide-link">Size Guide</Link>
              </div>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="product-option">
              <label className="option-label">Quantity</label>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button 
                className={`add-to-cart-btn ${isAddingToCart ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAddingToCart || !selectedSize}
              >
                {isAddingToCart ? (
                  <>
                    <span className="spinner"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="cart-icon">🛒</span>
                    Add to Cart - {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>

              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={!selectedSize}
              >
                Buy Now
              </button>

              <button className="wishlist-btn" title="Add to wishlist">
                ♡ Save for Later
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <span>30-day return policy</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewCount})
            </button>
            <button 
              className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.fullDescription}</p>
                
                <h4>Key Features</h4>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Product Specifications</h3>
                <table className="specifications-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="spec-label">{key}</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating-large">{product.rating}</span>
                    <div className="stars-large">
                      {'⭐'.repeat(5)}
                    </div>
                    <span>{product.reviewCount} reviews</span>
                  </div>
                </div>
                <div className="reviews-list">
                  <p>Review functionality coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h3>Shipping & Returns</h3>
                <div className="shipping-info">
                  <h4>Shipping Information</h4>
                  <ul>
                    <li>Free standard shipping on orders over $75</li>
                    <li>Express shipping available for $9.99</li>
                    <li>Orders processed within 1-2 business days</li>
                    <li>International shipping available</li>
                  </ul>
                  
                  <h4>Return Policy</h4>
                  <ul>
                    <li>30-day return policy for unworn items</li>
                    <li>Original packaging must be included</li>
                    <li>Free returns for US customers</li>
                    <li>Refund processed within 5 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;