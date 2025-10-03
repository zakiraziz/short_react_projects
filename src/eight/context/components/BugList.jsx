import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies.",
      icon: "💻"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interface designs.",
      icon: "🎨"
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android.",
      icon: "📱"
    },
    {
      title: "Consulting",
      description: "Expert advice on technology strategy and implementation.",
      icon: "🔍"
    }
  ];

  return (
    <div className="page">
      <h1>Our Services</h1>
      <p>We offer a wide range of services to meet your digital needs.</p>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
