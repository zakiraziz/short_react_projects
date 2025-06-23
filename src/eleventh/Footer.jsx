import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Providing the best shoes since 2010. Quality and comfort guaranteed.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@solemates.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#facebook">FB</a>
            <a href="#instagram">IG</a>
            <a href="#twitter">TW</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} SoleMates. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
