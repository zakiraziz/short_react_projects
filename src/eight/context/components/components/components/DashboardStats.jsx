import React from 'react';

const Home = () => {
  return (
    <div className="page">
      <h1>Welcome to Our Website</h1>
      <p>This is the home page of our React application.</p>
      <div className="features">
        <div className="feature-card">
          <h3>Feature 1</h3>
          <p>Discover amazing features that will help you achieve your goals.</p>
        </div>
        <div className="feature-card">
          <h3>Feature 2</h3>
          <p>Experience seamless navigation and user-friendly interface.</p>
        </div>
        <div className="feature-card">
          <h3>Feature 3</h3>
          <p>Get access to exclusive content and resources.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
