// src/components/Footer.js - Site footer with links, newsletter, and contact information
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', path: '/products' },
        { label: 'New Arrivals', path: '/products?filter=new' },
        { label: 'Best Sellers', path: '/products?filter=bestsellers' },
        { label: 'Sale Items', path: '/products?filter=sale' },
        { label: 'Gift Cards', path: '/gift-cards' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'Shipping Information', path: '/shipping' },
        { label: 'Returns & Exchanges', path: '/returns' },
        { label: 'Size Guide', path: '/size-guide' },
        { label: 'FAQs', path: '/faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Store Locations', path: '/stores' },
        { label: 'Press Kit', path: '/press' },
        { label: 'Affiliate Program', path: '/affiliate' }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: '📘', 
      label: 'Facebook', 
      url: 'https://facebook.com/solemates',
      color: '#1877F2'
    },
    { 
      icon: '📷', 
      label: 'Instagram', 
      url: 'https://instagram.com/solemates',
      color: '#E4405F'
    },
    { 
      icon: '🐦', 
      label: 'Twitter', 
      url: 'https://twitter.com/solemates',
      color: '#1DA1F2'
    },
    { 
      icon: '📺', 
      label: 'YouTube', 
      url: 'https://youtube.com/solemates',
      color: '#FF0000'
    },
    { 
      icon: '📌', 
      label: 'Pinterest', 
      url: 'https://pinterest.com/solemates',
      color: '#BD081C'
    }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'American Express', icon: '💳' },
    { name: 'PayPal', icon: '🏦' },
    { name: 'Apple Pay', icon: '📱' },
    { name: 'Google Pay', icon: '📱' }
  ];

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'support@solemates.com', link: 'mailto:support@solemates.com' },
    { icon: '📞', label: 'Phone', value: '1-800-SOLE-MATE', link: 'tel:1-800-765-3628' },
    { icon: '💬', label: 'Live Chat', value: 'Available 24/7', link: '/contact' },
    { icon: '🏢', label: 'Address', value: '123 Shoe Street, Fashion District, NY 10001', link: '/stores' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate newsletter subscription
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand & Newsletter Section */}
          <div className="footer-brand-section">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="logo-icon">👟</span>
                <span className="logo-text">SoleMates</span>
              </Link>
              <p className="footer-description">
                Your ultimate destination for premium footwear. Step into style with 
                our curated collection of comfortable and fashionable shoes for every occasion.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="newsletter-section">
              <h4 className="newsletter-title">Stay in the Loop</h4>
              <p className="newsletter-description">
                Subscribe to get updates on new arrivals, special offers, and exclusive deals.
              </p>
              
              {isSubscribed ? (
                <div className="newsletter-success">
                  <span className="success-icon">✅</span>
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <div className="newsletter-input-group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                      required
                    />
                    <button type="submit" className="newsletter-button">
                      Subscribe
                    </button>
                  </div>
                  <p className="newsletter-note">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links-sections">
            {footerSections.map(section => (
              <div key={section.title} className="footer-section">
                <h4 className="section-title">{section.title}</h4>
                <ul className="footer-links">
                  {section.links.map(link => (
                    <li key={link.label} className="footer-link-item">
                      <Link to={link.path} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Information */}
            <div className="footer-section">
              <h4 className="section-title">Contact Info</h4>
              <div className="contact-info">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="contact-item">
                    <span className="contact-icon">{contact.icon}</span>
                    <div className="contact-details">
                      <span className="contact-label">{contact.label}:</span>
                      <a 
                        href={contact.link} 
                        className="contact-value"
                        target={contact.link.startsWith('http') ? '_blank' : '_self'}
                        rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h5 className="social-title">Follow Us</h5>
                <div className="social-links">
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.url}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={{ '--social-color': social.color }}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-tooltip">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            {/* Copyright */}
            <div className="copyright-section">
              <p className="copyright">
                &copy; {currentYear} SoleMates. All rights reserved.
              </p>
              <div className="business-info">
                <span>Premium Footwear Retailer</span>
                <span className="divider">•</span>
                <span>Est. 2020</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="legal-links">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <span className="divider">•</span>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
              <span className="divider">•</span>
              <Link to="/cookies" className="legal-link">Cookie Policy</Link>
              <span className="divider">•</span>
              <Link to="/sitemap" className="legal-link">Sitemap</Link>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <span className="payment-text">We Accept:</span>
              <div className="payment-icons">
                {paymentMethods.map((method, index) => (
                  <span 
                    key={index} 
                    className="payment-icon"
                    title={method.name}
                  >
                    {method.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <span className="badge-icon">🔒</span>
              <span>SSL Secure</span>
            </div>
            <div className="trust-badge">
              <span className="badge-icon">⭐</span>
              <span>4.8/5 Rating</span>
            </div>
            <div className="trust-badge">
              <span className="badge-icon">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="trust-badge">
              <span className="badge-icon">↩️</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;