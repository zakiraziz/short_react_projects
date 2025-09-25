// src/pages/About.js - About us page with company information
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Passionate about footwear and customer satisfaction",
      emoji: "👩‍💼"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Head of Design",
      bio: "Creative visionary with 10+ years in fashion",
      emoji: "👨‍🎨"
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Customer Experience",
      bio: "Dedicated to making every interaction special",
      emoji: "👩‍💻"
    }
  ];

  const values = [
    {
      icon: "⭐",
      title: "Quality First",
      description: "We never compromise on the quality of our products"
    },
    {
      icon: "🤝",
      title: "Customer Focused",
      description: "Your satisfaction is our top priority"
    },
    {
      icon: "🌱",
      title: "Sustainable",
      description: "Committed to environmentally friendly practices"
    },
    {
      icon: "💡",
      title: "Innovative",
      description: "Always exploring new designs and technologies"
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>About SoleMates</h1>
            <p className="hero-subtitle">
              Where every step tells a story of quality, comfort, and style
            </p>
          </div>
          <div className="hero-image">
            <span className="hero-emoji">👟✨</span>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="story-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <div className="story-text">
              <p>
                Founded in 2020, SoleMates began as a simple idea: everyone deserves 
                comfortable, stylish footwear that doesn't break the bank. What started 
                as a small online store has grown into a trusted destination for shoe 
                lovers worldwide.
              </p>
              <p>
                Our journey began when our founder, Sarah Johnson, struggled to find 
                quality shoes that combined comfort, style, and affordability. She 
                realized that many people faced the same challenge, and thus, 
                SoleMates was born.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across the globe, 
                offering carefully curated collections from both established brands 
                and emerging designers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            Behind every great pair of shoes is an even greater team dedicated to 
            making your experience exceptional.
          </p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="member-emoji">{member.emoji}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Brands Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30</span>
              <span className="stat-label">Day Returns</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Pair?</h2>
            <p>Join thousands of satisfied customers who've found their sole mates with us.</p>
            <div className="cta-buttons">
              <Link to="/products" className="cta-button primary">
                Shop Collection
              </Link>
              <Link to="/contact" className="cta-button secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;