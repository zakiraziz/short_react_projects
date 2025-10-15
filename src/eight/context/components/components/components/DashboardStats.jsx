import React from 'react';

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <h1>Welcome to Our Website</h1>
        <p>Discover amazing products and services that will transform your business</p>
      </section>
      
      <div className="features">
        <div className="feature-card">
          <h3>Quality Products</h3>
          <p>We offer the highest quality products with guaranteed satisfaction.</p>
        </div>
        
        <div className="feature-card">
          <h3>Expert Support</h3>
          <p>Our team of experts is available 24/7 to help you succeed.</p>
        </div>
        
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Get your products delivered quickly with our express shipping.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
