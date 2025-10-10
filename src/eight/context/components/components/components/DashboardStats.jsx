import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const heroSlides = [
    {
      title: "Transform Your Digital Presence",
      subtitle: "We create stunning web experiences that drive results",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      cta: "Get Started"
    },
    {
      title: "Innovative Web Solutions",
      subtitle: "Cutting-edge technology for modern businesses",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      cta: "Learn More"
    },
    {
      title: "Your Vision, Our Expertise",
      subtitle: "Bringing ideas to life with precision and creativity",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      cta: "View Portfolio"
    }
  ];

  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Optimized performance with fast loading times and smooth interactions.",
      stats: "Loads 3x faster"
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Modern, responsive designs that look great on all devices.",
      stats: "100% responsive"
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee.",
      stats: "99.9% uptime"
    },
    {
      icon: "⚡",
      title: "SEO Optimized",
      description: "Built with best practices to rank higher in search results.",
      stats: "Better rankings"
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Designed for mobile devices first, then scaled up for desktop.",
      stats: "Mobile optimized"
    },
    {
      icon: "🛠️",
      title: "Easy to Maintain",
      description: "Clean, documented code that's easy to update and maintain.",
      stats: "Easy updates"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Their team delivered an exceptional product that exceeded our expectations. The attention to detail was remarkable!",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Product Manager",
      content: "Working with them was a game-changer for our business. The website they built increased our conversions by 45%.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      content: "Professional, creative, and efficient. They understood our vision and brought it to life perfectly.",
      avatar: "👩‍🎨",
      rating: 4
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Team Members" },
    { number: "3", label: "Years Experience" }
  ];

  const technologies = [
    "React", "Vue.js", "Node.js", "Python", "TypeScript", "MongoDB", 
    "AWS", "Docker", "Figma", "GraphQL", "Next.js", "Firebase"
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className={`home-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section with Slider */}
      <section className="hero-section">
        <div 
          className="hero-slider"
          style={{ background: heroSlides[currentSlide].background }}
        >
          <div className="hero-content">
            <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
            <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('features')}
              >
                {heroSlides[currentSlide].cta}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Slider Indicators */}
          <div className="slider-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <p>We combine cutting-edge technology with creative design to deliver exceptional results</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-stats">{feature.stats}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Technology Stack</h2>
            <p>We work with the latest technologies to build robust and scalable solutions</p>
          </div>
          <div className="tech-scroll">
            <div className="tech-list">
              {technologies.concat(technologies).map((tech, index) => (
                <span key={index} className="tech-item">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it - hear from our satisfied clients</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Process</h2>
            <p>A structured approach to ensure project success</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Discovery</h3>
              <p>We understand your requirements and define project goals</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Design</h3>
              <p>Create wireframes and design mockups for your approval</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Development</h3>
              <p>Build your solution using best practices and modern tech</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Delivery</h3>
              <p>Thorough testing and deployment with ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's work together to bring your ideas to life. Get in touch for a free consultation.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Get Free Quote</button>
              <button className="btn btn-secondary">Schedule a Call</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates and insights</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
