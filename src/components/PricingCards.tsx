import React from 'react';
import './styles/PricingCards.scss';

function PricingCards() {
  return (
    <div className="pricing-cards">
      <div className="pricing-card">
        <h3>Free</h3>
        <p>Features</p>
      </div>
      <div className="pricing-card">
        <h3>Premium</h3>
        <p>Features</p>
      </div>
      <div className="pricing-card">
        <h3>Enterprise</h3>
        <p>Features</p>
      </div>
    </div>
  );
}

export default PricingCards;
