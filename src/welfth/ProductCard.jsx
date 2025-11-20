/* ProductCard.css */
.product-card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 12px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-loader {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.sale-badge, .new-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.sale-badge {
  background: #e74c3c;
}

.new-badge {
  background: #27ae60;
  top: 40px;
}

.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #e74c3c;
}

.product-info {
  padding: 8px 0;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.star {
  color: #ddd;
  font-size: 14px;
}

.star.filled {
  color: #f39c12;
}

.rating-count {
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

.price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.sale-price, .current-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.current-price {
  color: #2c3e50;
}

.product-features {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
}

.product-features li {
  font-size: 12px;
  color: #27ae60;
  margin-bottom: 2px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.add-to-cart-btn {
  flex: 1;
  padding: 10px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-1px);
}

.add-to-cart-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.add-to-cart-btn.in-cart {
  background: #27ae60;
}

.add-to-cart-btn.adding {
  background: #95a5a6;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.wishlist-btn {
  padding: 10px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wishlist-btn:hover {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.quick-view-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.quick-view-btn {
  pointer-events: all;
  padding: 10px 20px;
  background: white;
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
}
