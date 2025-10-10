import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'info@example.com',
      description: 'Send us an email anytime',
      action: 'mailto:info@example.com'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm',
      action: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Main Street, City, State 12345',
      description: 'Come say hello at our office',
      action: 'https://maps.google.com'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Get instant support',
      action: '#chat'
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer: "We typically respond within 24 hours during business days."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we offer free 30-minute consultations for new projects."
    },
    {
      question: "What industries do you work with?",
      answer: "We work with startups, SMEs, and enterprises across various industries."
    },
    {
      question: "What's your typical project timeline?",
      answer: "Timelines vary by project scope, but most projects take 4-12 weeks."
    }
  ];

  const budgetOptions = [
    'Less than $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000+'
  ];

  const timelineOptions = [
    'ASAP',
    'Within 2 weeks',
    'Within 1 month',
    'Within 3 months',
    'Flexible'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleContactMethodClick = (action) => {
    if (action.startsWith('http') || action.startsWith('mailto') || action.startsWith('tel')) {
      window.open(action, '_blank');
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Let's Start Something Amazing</h1>
          <p className="hero-subtitle">
            Ready to bring your ideas to life? Get in touch with us and let's create 
            something extraordinary together.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="method-card"
                onClick={() => handleContactMethodClick(method.action)}
              >
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p className="method-details">{method.details}</p>
                <p className="method-description">{method.description}</p>
                <span className="method-action">Click to connect →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="form-section">
              <h2>Send us a Message</h2>
              <p className="form-intro">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert alert-error">
                  ❌ There was an error sending your message. Please try again or contact us directly.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className={activeField === 'name' ? 'active' : ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className={activeField === 'email' ? 'active' : ''}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={activeField === 'phone' ? 'active' : ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus('company')}
                      onBlur={handleBlur}
                      className={activeField === 'company' ? 'active' : ''}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className={activeField === 'subject' ? 'active' : ''}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Project Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onFocus={() => handleFocus('budget')}
                      onBlur={handleBlur}
                      className={activeField === 'budget' ? 'active' : ''}
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="timeline">Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      onFocus={() => handleFocus('timeline')}
                      onBlur={handleBlur}
                      className={activeField === 'timeline' ? 'active' : ''}
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    className={activeField === 'message' ? 'active' : ''}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & FAQ */}
            <div className="info-section">
              {/* Office Info */}
              <div className="office-info">
                <h3>Our Office</h3>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>123 Main Street<br />City, State 12345<br />United States</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🕒</span>
                  <div>
                    <strong>Business Hours</strong>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 2:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🌐</span>
                  <div>
                    <strong>Follow Us</strong>
                    <div className="social-links">
                      <a href="#" className="social-link">LinkedIn</a>
                      <a href="#" className="social-link">Twitter</a>
                      <a href="#" className="social-link">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="emergency-contact">
                <div className="emergency-icon">🚨</div>
                <h4>Urgent Project?</h4>
                <p>Need immediate assistance? Call us directly:</p>
                <a href="tel:+15551234567" className="emergency-phone">+1 (555) 123-4567</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us Here</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <span className="map-icon">🗺️</span>
              <h3>Interactive Map</h3>
              <p>123 Main Street, City, State 12345</p>
              <button className="map-btn">Open in Google Maps</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
