import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Subscribed with:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">SoleMates</h3>
          <p className="footer-about">
            Providing premium footwear since 2010. Our mission is to deliver quality, comfort, and style in every step you take.
          </p>
          <div className="footer-newsletter">
            <h4>Subscribe to our newsletter</h4>
            {subscribed ? (
              <p className="subscription-success">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Our Products</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/shipping">Shipping Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span>123 Shoe Street, Footwear City, FC 12345</span>
            </div>
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <a href="mailto:info@solemates.com">info@solemates.com</a>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" />
              <a href="tel:+11234567890">(123) 456-7890</a>
            </div>
          </div>
          <div className="business-hours">
            <h4>Business Hours</h4>
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://youtube.com" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://pinterest.com" aria-label="Pinterest"><FaPinterest /></a>
          </div>
          <div className="payment-methods">
            <h4>We Accept</h4>
            <div className="payment-icons">
              <span className="payment-icon visa">Visa</span>
              <span className="payment-icon mastercard">Mastercard</span>
              <span className="payment-icon amex">Amex</span>
              <span className="payment-icon paypal">PayPal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <span>&copy; {new Date().getFullYear()} SoleMates. All rights reserved.</span>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;