import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      title: "Quality Products",
      description: "We offer the highest quality products with guaranteed satisfaction.",
      icon: "⭐"
    },
    {
      title: "Expert Support",
      description: "Our team of experts is available 24/7 to help you succeed.",
      icon: "🔧"
    },
    {
      title: "Fast Delivery",
      description: "Get your products delivered quickly with our express shipping.",
      icon: "🚚"
    },
    {
      title: "Secure Payment",
      description: "Your transactions are protected with bank-level security.",
      icon: "🔒"
    },
    {
      title: "Easy Returns",
      description: "30-day hassle-free return policy on all products.",
      icon: "↩️"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleGetStarted = () => {
    alert('Welcome! Getting started...');
    // You can replace this with actual navigation
  };

  const handleLearnMore = () => {
    // Scroll to features section
    document.querySelector('.features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Website</h1>
          <p className="hero-subtitle">
            Discover amazing products and services that will transform your business and take you to the next level
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <h4>Featured Product</h4>
            <p>Check out our latest innovation</p>
            <span className="badge">NEW</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <h3>10,000+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Products Available</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Customer Support</p>
        </div>
        <div className="stat-item">
          <h3>98%</h3>
          <p>Satisfaction Rate</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p>We provide everything you need to succeed in your business</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${index === currentFeature ? 'active' : ''}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"This company completely transformed our workflow. Highly recommended!"</p>
            <div className="testimonial-author">
              <strong>Sarah Johnson</strong>
              <span>CEO, TechCorp</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"Outstanding service and support. The team went above and beyond!"</p>
            <div className="testimonial-author">
              <strong>Mike Chen</strong>
              <span>Marketing Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers today</p>
          <button className="btn btn-large" onClick={handleGetStarted}>
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
