// src/pages/Home.js - Homepage with hero section, categories, and featured products
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Air Max Pulse",
      brand: "Nike",
      price: 129.99,
      originalPrice: 149.99,
      category: "Lifestyle",
      emoji: "👟",
      description: "Modern comfort meets street-ready style",
      rating: 4.5,
      reviewCount: 128,
      colors: ["Black", "White", "Gray"],
      sizes: [7, 8, 9, 10, 11, 12],
      onSale: true,
      isNew: false
    },
    {
      id: 2,
      name: "Ultraboost Light",
      brand: "Adidas",
      price: 149.99,
      category: "Running",
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
      id: 3,
      name: "Classic Leather",
      brand: "Reebok",
      price: 89.99,
      category: "Casual",
      emoji: "👞",
      description: "Timeless style with modern comfort",
      rating: 4.3,
      reviewCount: 204,
      colors: ["White", "Navy", "Red"],
      sizes: [7, 8, 9, 10, 11],
      onSale: false,
      isNew: false
    },
    {
      id: 4,
      name: "Chuck Taylor All Star",
      brand: "Converse",
      price: 59.99,
      originalPrice: 69.99,
      category: "Lifestyle",
      emoji: "👟",
      description: "The iconic sneaker that started it all",
      rating: 4.7,
      reviewCount: 312,
      colors: ["Black", "White", "Red", "Blue"],
      sizes: [6, 7, 8, 9, 10, 11, 12],
      onSale: true,
      isNew: false
    }
  ];

  const categories = [
    {
      id: 'running',
      name: 'Running',
      emoji: '🏃‍♂️',
      description: 'Performance shoes for runners',
      count: 24,
      image: '🏃'
    },
    {
      id: 'basketball',
      name: 'Basketball',
      emoji: '🏀',
      description: 'Court-ready basketball shoes',
      count: 18,
      image: '🏀'
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      emoji: '👟',
      description: 'Casual everyday sneakers',
      count: 42,
      image: '👟'
    },
    {
      id: 'hiking',
      name: 'Hiking',
      emoji: '🥾',
      description: 'Outdoor adventure footwear',
      count: 15,
      image: '🥾'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Brands Available' },
    { number: '24/7', label: 'Customer Support' },
    { number: '30', label: 'Day Returns' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Step Into <span className="highlight">Style</span>
              </h1>
              <p className="hero-subtitle">
                Discover the perfect pair that combines comfort, quality, and 
                contemporary design. Your journey to better footwear starts here.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="cta-button primary">
                  Shop Collection
                </Link>
                <Link to="/about" className="cta-button secondary">
                  Learn More
                </Link>
              </div>
              
              {/* Stats */}
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="shoe-showcase">
                <div className="floating-shoe main">👟</div>
                <div className="floating-shoe secondary">🏃</div>
                <div className="floating-shoe tertiary">👞</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect shoes for every occasion</p>
          </div>
          
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">{category.emoji}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-count">{category.count} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>



export default Home;
