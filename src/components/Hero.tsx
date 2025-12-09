import React from 'react';
import './styles/Hero.scss';

function Hero() {
  return (
    <section className="hero">
      <h1 className="gradient-text">Business Formation Assistant</h1>
      <p>Guide to starting your business</p>
      <button className="btn-metallic">Get Started</button>
      <button className="btn-glass">Learn More</button>
    </section>
  );
}

export default Hero;
