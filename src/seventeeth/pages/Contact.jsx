// src/pages/Contact.js - Contact page with form and information
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      contactMethod: 'email'
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'support@solemates.com',
      description: 'Send us an email anytime',
      responseTime: 'Within 24 hours'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '1-800-SOLE-MATE',
      description: 'Mon-Fri from 8am to 6pm EST',
      responseTime: 'Immediate assistance'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Start chatting',
      description: 'Click the chat icon in the corner',
      responseTime: 'Within 5 minutes'
    },
    {
      icon: '🏢',
      title: 'Visit Us',
      details: '123 Shoe Street, Fashion District',
      description: 'New York, NY 10001',
      responseTime: 'By appointment'
    }
  ];

  const faqs = [
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for unworn items in original packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide with various shipping options."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay."
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Get in Touch</h1>
          <p>We're here to help! Reach out to us with any questions or concerns.</p>
        </div>

        <div className="contact-layout">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <p className="contact-intro">
              Choose your preferred method of communication. Our team is ready to 
              assist you with any questions about our products, orders, or services.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method-card">
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-content">
                    <h3>{method.title}</h3>
                    <p className="method-details">{method.details}</p>
                    <p className="method-description">{method.description}</p>
                    <p className="response-time">{method.responseTime}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="business-hours">
              <h3>Business Hours</h3>
              <div className="hours-list">
                <div className="hour-item">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM EST</span>
                </div>
                <div className="hour-item">
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="hour-item">
                  <span>Sunday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            
            {isSubmitted && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <p>Thank you for your message! We'll get back to you within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="order-inquiry">Order Inquiry</option>
                  <option value="product-question">Product Question</option>
                  <option value="shipping-info">Shipping Information</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your inquiry in detail..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Preferred Contact Method</label>
                <div className="contact-method-options">
                  <label className="option-label">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleInputChange}
                    />
                    <span>Email</span>
                  </label>
                  <label className="option-label">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleInputChange}
                    />
                    <span>Phone</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Visit Our Store</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <span className="map-emoji">🗺️</span>
              <p>123 Shoe Street, Fashion District</p>
              <p>New York, NY 10001</p>
              <p className="store-hours">Open Mon-Sat: 9AM-8PM, Sun: 11AM-6PM</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;