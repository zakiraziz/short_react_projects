import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      title: "Modern Design",
      description: "Our website features a sleek, responsive design that looks great on all devices.",
      icon: "🎨"
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed with lazy loading and efficient code bundling.",
      icon: "⚡"
    },
    {
      title: "User Friendly",
      description: "Intuitive navigation and accessible components for all users.",
      icon: "🤝"
    }
  ];

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  const handleFeatureClick = (index) => {
    setActiveFeature(index);
  };

  const handleGetStarted = () => {
    navigate('/contact');
  };

  return (
    <main className={`home-page ${isVisible ? 'visible' : ''}`}>
      <section className="hero">
        <div className="hero-content">
          <h1>Build Amazing Web Experiences</h1>
          <p className="subtitle">Create modern, responsive websites with our React-powered platform</p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <div className="gradient-circle"></div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card ${index === activeFeature ? 'active' : ''}`}
              onClick={() => handleFeatureClick(index)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <p className="quote">"This website exceeded all our expectations. The performance is incredible!"</p>
            <div className="client-info">
              <span className="client-name">Sarah Johnson</span>
              <span className="client-title">CEO, TechSolutions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join hundreds of satisfied customers who have transformed their online presence.</p>
        <button className="cta-button secondary" onClick={handleGetStarted}>
          Contact Us Today
        </button>
      </section>
    </main>
  );
};

export default HomePage;