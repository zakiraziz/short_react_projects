import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/yourusername" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourhandle" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile" },
    { icon: <FaEnvelope />, url: "mailto:youremail@example.com" }
  ];

  const quickLinks = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Services", url: "/services" },
    { title: "Portfolio", url: "/portfolio" },
    { title: "Blog", url: "/blog" },
    { title: "Contact", url: "/contact" }
  ];

  const companyInfo = [
    { label: "Address", value: "123 Business St, City, Country" },
    { label: "Phone", value: "+1 (555) 123-4567" },
    { label: "Email", value: "info@yourwebsite.com" }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about-section">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">
            We create modern, responsive websites and applications using cutting-edge technologies like React.js.
          </p>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Social media link ${index}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3 className="footer-heading">Contact Info</h3>
          <ul className="contact-info">
            {companyInfo.map((item, index) => (
              <li key={index}>
                <span className="contact-label">{item.label}:</span>
                <span className="contact-value">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="footer-text">Subscribe to our newsletter for updates.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} React Website. All rights reserved.
        </p>
        <div className="legal-links">
          <a href="/privacy">Privacy Policy</a>
          <span> | </span>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;