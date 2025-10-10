import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeSection, setActiveSection] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with 8+ years of experience in React and Node.js",
      image: "/images/sarah.jpg"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "UI/UX Designer",
      bio: "Creative designer passionate about user-centered design and accessibility",
      image: "/images/mike.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Project Manager",
      bio: "Agile expert with a track record of delivering successful projects on time",
      image: "/images/emily.jpg"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "15+", label: "Countries Served" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "3", label: "Years Experience" }
  ];

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p className="hero-subtitle">
            We are a passionate team dedicated to creating amazing web experiences 
            that drive results and make a difference.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="about-content">
        {/* Our Story */}
        <section className="content-section">
          <div className="section-header">
            <h2>Our Story</h2>
            <button 
              className="toggle-btn"
              onClick={() => toggleSection('story')}
            >
              {activeSection === 'story' ? '−' : '+'}
            </button>
          </div>
          <div className={`section-content ${activeSection === 'story' ? 'active' : ''}`}>
            <p>
              Founded in 2024, we have been at the forefront of web development, 
              creating innovative solutions for our clients worldwide. What started 
              as a small team of three has grown into a diverse collective of 
              talented professionals.
            </p>
            <p>
              Our journey began with a simple belief: that technology should be 
              accessible, intuitive, and powerful. Today, we continue to uphold 
              this belief in every project we undertake.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="content-section">
          <div className="section-header">
            <h2>Our Mission</h2>
            <button 
              className="toggle-btn"
              onClick={() => toggleSection('mission')}
            >
              {activeSection === 'mission' ? '−' : '+'}
            </button>
          </div>
          <div className={`section-content ${activeSection === 'mission' ? 'active' : ''}`}>
            <p>
              To deliver high-quality, user-centric web applications that solve 
              real-world problems and enhance user experiences. We believe in 
              creating technology that serves people, not the other way around.
            </p>
            <ul className="mission-list">
              <li>✅ User-first design approach</li>
              <li>✅ Cutting-edge technology stack</li>
              <li>✅ Sustainable and scalable solutions</li>
              <li>✅ Continuous learning and improvement</li>
            </ul>
          </div>
        </section>

        {/* Our Values */}
        <section className="content-section">
          <div className="section-header">
            <h2>Our Values</h2>
            <button 
              className="toggle-btn"
              onClick={() => toggleSection('values')}
            >
              {activeSection === 'values' ? '−' : '+'}
            </button>
          </div>
          <div className={`section-content ${activeSection === 'values' ? 'active' : ''}`}>
            <div className="values-grid">
              <div className="value-item">
                <h4>Innovation</h4>
                <p>We embrace new technologies and creative approaches to solve complex challenges.</p>
              </div>
              <div className="value-item">
                <h4>Collaboration</h4>
                <p>We believe the best results come from working together and sharing knowledge.</p>
              </div>
              <div className="value-item">
                <h4>Quality</h4>
                <p>We never compromise on quality and always strive for excellence in our work.</p>
              </div>
              <div className="value-item">
                <h4>Integrity</h4>
                <p>We maintain transparency and honesty in all our client relationships.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            Our diverse team of developers, designers, and strategists work 
            together to bring your ideas to life with expertise and passion.
          </p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="member-image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = '/images/placeholder-avatar.jpg';
                    }}
                  />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's work together to create something amazing.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Get in Touch</button>
            <button className="btn btn-secondary">View Our Work</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
