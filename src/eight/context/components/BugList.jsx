import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom web applications built with modern technologies.",
      detailedDescription: "We create responsive, scalable web applications using React, Vue.js, Node.js, and modern frameworks. From single-page applications to complex enterprise solutions.",
      icon: "💻",
      features: [
        "Responsive Design",
        "Progressive Web Apps",
        "E-commerce Solutions",
        "API Integration",
        "Performance Optimization"
      ],
      technologies: ["React", "Vue.js", "Node.js", "MongoDB", "PostgreSQL"],
      price: "Starting at $5,000",
      duration: "4-8 weeks"
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interface designs.",
      detailedDescription: "User-centered design approach focusing on creating engaging and accessible experiences. We conduct user research, create wireframes, and design pixel-perfect interfaces.",
      icon: "🎨",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Interactive Mockups",
        "Design Systems",
        "Accessibility Compliance"
      ],
      technologies: ["Figma", "Sketch", "Adobe XD", "InVision", "Principle"],
      price: "Starting at $3,000",
      duration: "2-6 weeks"
    },
    {
      id: 3,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android.",
      detailedDescription: "Native and cross-platform mobile app development that delivers seamless experiences across all devices and platforms.",
      icon: "📱",
      features: [
        "iOS & Android Development",
        "React Native Apps",
        "App Store Deployment",
        "Push Notifications",
        "Offline Functionality"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      price: "Starting at $8,000",
      duration: "6-12 weeks"
    },
    {
      id: 4,
      title: "Consulting",
      description: "Expert advice on technology strategy and implementation.",
      detailedDescription: "Strategic technology consulting to help you make informed decisions, optimize processes, and leverage the right technologies for your business goals.",
      icon: "🔍",
      features: [
        "Technology Audits",
        "Digital Transformation",
        "Architecture Planning",
        "Team Training",
        "Code Reviews"
      ],
      technologies: ["Strategy", "Architecture", "Best Practices", "Training", "Support"],
      price: "$150/hour",
      duration: "Flexible"
    },
    {
      id: 5,
      title: "DevOps & Cloud",
      description: "Infrastructure, deployment, and cloud solutions.",
      detailedDescription: "End-to-end DevOps services including CI/CD pipeline setup, cloud infrastructure, monitoring, and automation.",
      icon: "☁️",
      features: [
        "CI/CD Pipeline Setup",
        "Cloud Migration",
        "Containerization",
        "Monitoring & Logging",
        "Infrastructure as Code"
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      price: "Starting at $4,000",
      duration: "2-4 weeks"
    },
    {
      id: 6,
      title: "Maintenance & Support",
      description: "Ongoing maintenance and technical support services.",
      detailedDescription: "Reliable maintenance and support packages to keep your applications running smoothly with regular updates and quick issue resolution.",
      icon: "⚙️",
      features: [
        "24/7 Monitoring",
        "Regular Updates",
        "Security Patches",
        "Performance Tuning",
        "Technical Support"
      ],
      technologies: ["Monitoring", "Security", "Updates", "Backups", "Support"],
      price: "Starting at $500/month",
      duration: "Ongoing"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "TechStart Inc.",
      service: "Web Development",
      text: "The team delivered an exceptional web application that exceeded our expectations. Highly recommended!",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Miller",
      company: "DesignCo",
      service: "UI/UX Design",
      text: "Their design approach transformed our user experience. Conversion rates increased by 45%!",
      rating: 5
    },
    {
      id: 3,
      name: "Mike Zhang",
      company: "MobileFirst",
      service: "Mobile Apps",
      text: "The cross-platform app they built works flawlessly on both iOS and Android. Great work!",
      rating: 4
    }
  ];

  const processSteps = [
    { step: 1, title: "Discovery", description: "We understand your requirements and goals" },
    { step: 2, title: "Planning", description: "We create a detailed project roadmap" },
    { step: 3, title: "Design", description: "We design wireframes and prototypes" },
    { step: 4, title: "Development", description: "We build your solution with best practices" },
    { step: 5, title: "Testing", description: "We ensure quality through rigorous testing" },
    { step: 6, title: "Launch", description: "We deploy and monitor your solution" }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(selectedService?.id === service.id ? null : service);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p className="hero-subtitle">
            Comprehensive digital solutions to transform your business and drive growth. 
            From concept to deployment, we've got you covered.
          </p>
          <button className="cta-button">Get Free Consultation</button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            Explore our range of professional services designed to meet your unique needs
          </p>
          
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card ${selectedService?.id === service.id ? 'active' : ''} ${hoveredCard === service.id ? 'hovered' : ''}`}
                onClick={() => handleServiceClick(service)}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="feature-tag">✓ {feature}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="price-duration">
                    <span className="price">{service.price}</span>
                    <span className="duration">{service.duration}</span>
                  </div>
                  <button className="learn-more-btn">
                    {selectedService?.id === service.id ? 'Show Less' : 'Learn More'}
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedService?.id === service.id && (
                  <div className="service-details">
                    <div className="details-content">
                      <p className="detailed-description">{service.detailedDescription}</p>
                      
                      <div className="features-list">
                        <h4>Key Features:</h4>
                        <ul>
                          {service.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="technologies">
                        <h4>Technologies:</h4>
                        <div className="tech-tags">
                          {service.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="action-buttons">
                        <button className="btn btn-primary">Get Quote</button>
                        <button className="btn btn-secondary">View Case Study</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">
            A structured approach to ensure project success and client satisfaction
          </p>
          
          <div className="process-steps">
            {processSteps.map((step) => (
              <div key={step.step} className="process-step">
                <div className="step-number">{step.step}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            See what our clients say about working with us
          </p>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.company}</p>
                  <span className="service-badge">{testimonial.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can help you achieve your goals</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Schedule a Call</button>
              <button className="btn btn-secondary">View Portfolio</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
