import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { FiArrowUp, FiHeart } from 'react-icons/fi';
import { RiCustomerService2Line, RiSecurePaymentLine } from 'react-icons/ri';
import { HiShieldCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      try {
        // Simulate API call
        console.log('Subscribed with:', email);
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      } catch (error) {
        console.error('Subscription failed:', error);
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Trust badges data
  const trustBadges = [
    { icon: <RiSecurePaymentLine />, text: 'Secure Payment' },
    { icon: <HiShieldCheck />, text: '1 Year Warranty' },
    { icon: <RiCustomerService2Line />, text: '24/7 Support' },
    { icon: <FiHeart />, text: 'Satisfaction Guaranteed' }
  ];

  // Quick links data
  const quickLinks = {
    'Shop': [
      { name: 'New Arrivals', path: '/new-arrivals' },
      { name: 'Best Sellers', path: '/best-sellers' },
      { name: 'Sale', path: '/sale' },
      { name: 'Custom Shoes', path: '/custom' }
    ],
    'Customer Service': [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns & Exchanges', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'Track Order', path: '/track-order' }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Affiliate Program', path: '/affiliate' }
    ]
  };

  // Social media links
  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaPinterest />, url: 'https://pinterest.com', label: 'Pinterest' },
    { icon: <FaTiktok />, url: 'https://tiktok.com', label: 'TikTok' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  // Payment methods
  const paymentMethods = [
    { name: 'Visa', type: 'visa' },
    { name: 'Mastercard', type: 'mastercard' },
    { name: 'Amex', type: 'amex' },
    { name: 'PayPal', type: 'paypal' },
    { name: 'Apple Pay', type: 'apple-pay' },
    { name: 'Google Pay', type: 'google-pay' },
    { name: 'Shop Pay', type: 'shop-pay' }
  ];

  return (
    <footer className="footer">
      {/* Trust Badges Section */}
      <div className="trust-badges">
        <div className="container">
          {trustBadges.map((badge, index) => (
            <div key={index} className="trust-badge">
              <div className="trust-icon">{badge.icon}</div>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section brand-section">
              <div className="footer-logo">
                <span className="logo-icon">👟</span>
                <span className="logo-text">SoleMates</span>
              </div>
              <p className="footer-about">
                Providing premium footwear since 2010. Our mission is to deliver quality, comfort, 
                and style in every step you take. Join our community of happy walkers!
              </p>
              
              <div className="footer-newsletter">
                <h4>Stay in the Loop</h4>
                <p>Get exclusive deals, new arrivals, and style tips</p>
                {subscribed ? (
                  <div className="subscription-success">
                    <div className="success-icon">✓</div>
                    <div>
                      <strong>Welcome to the SoleMates family!</strong>
                      <p>Check your email for a special welcome offer.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="newsletter-form">
                    <div className="input-group">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="newsletter-input"
                      />
                      <button type="submit" className="newsletter-btn">
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

            {/* Quick Links Sections */}
            {Object.entries(quickLinks).map(([category, links]) => (
              <div key={category} className="footer-section">
                <h3 className="footer-title">{category}</h3>
                <ul className="footer-links">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="footer-section contact-section">
              <h3 className="footer-title">Get in Touch</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <MdLocationOn className="contact-icon" />
                  <div>
                    <strong>Visit Our Store</strong>
                    <span>123 Shoe Street, Footwear City, FC 12345</span>
                  </div>
                </div>
                <div className="contact-item">
                  <MdEmail className="contact-icon" />
                  <div>
                    <strong>Email Us</strong>
                    <a href="mailto:info@solemates.com">info@solemates.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <MdPhone className="contact-icon" />
                  <div>
                    <strong>Call Us</strong>
                    <a href="tel:+11234567890">(123) 456-7890</a>
                  </div>
                </div>
                <div className="contact-item">
                  <MdAccessTime className="contact-icon" />
                  <div>
                    <strong>Business Hours</strong>
                    <div className="business-hours">
                      <span>Mon-Fri: 9am - 6pm</span>
                      <span>Saturday: 10am - 4pm</span>
                      <span>Sunday: Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Follow Our Journey</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      aria-label={social.label}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            {/* Payment Methods */}
            <div className="payment-section">
              <h4>We Accept</h4>
              <div className="payment-methods">
                {paymentMethods.map((method, index) => (
                  <span
                    key={index}
                    className={`payment-method ${method.type}`}
                    title={method.name}
                  >
                    {method.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="legal-section">
              <div className="copyright">
                &copy; {currentYear} SoleMates. All rights reserved. 
                Made with <FiHeart className="heart-icon" /> for shoe lovers.
              </div>
              <div className="legal-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
                <Link to="/accessibility">Accessibility</Link>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </div>

            {/* Country/Language Selector */}
            <div className="locale-selector">
              <select aria-label="Select country">
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="eu">European Union</option>
              </select>
              <select aria-label="Select language">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FiArrowUp />
      </button>

      {/* Mobile App Promotion */}
      <div className="mobile-app-promo">
        <div className="container">
          <div className="app-promo-content">
            <div className="app-info">
              <h4>Get the SoleMates App</h4>
              <p>Exclusive app-only deals and early access to sales</p>
              <div className="app-download-links">
                <a href="#" className="app-store-link" aria-label="Download on App Store">
                  App Store
                </a>
                <a href="#" className="play-store-link" aria-label="Download on Google Play">
                  Google Play
                </a>
              </div>
            </div>
            <div className="app-qr-code">
              <div className="qr-placeholder">QR Code</div>
              <span>Scan to download</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
