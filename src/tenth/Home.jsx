import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <main className="home-page">
      <h1>Welcome to Our Website</h1>
      <p>This is a modern React website built with JSX.</p>
      
      <section className="features">
        <div className="feature-card">
          <h3>Feature 1</h3>
          <p>Description of feature one.</p>
        </div>
        <div className="feature-card">
          <h3>Feature 2</h3>
          <p>Description of feature two.</p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;