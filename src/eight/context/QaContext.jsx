import React from 'react';

const About = () => {
  return (
    <div className="page">
      <h1>About Us</h1>
      <p>We are a passionate team dedicated to creating amazing web experiences.</p>
      
      <div className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            Founded in 2024, we have been at the forefront of web development, 
            creating innovative solutions for our clients worldwide.
          </p>
        </section>
        
        <section>
          <h2>Our Mission</h2>
          <p>
            To deliver high-quality, user-centric web applications that solve 
            real-world problems and enhance user experiences.
          </p>
        </section>
        
        <section>
          <h2>Our Team</h2>
          <p>
            Our diverse team of developers, designers, and strategists work 
            together to bring your ideas to life.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
