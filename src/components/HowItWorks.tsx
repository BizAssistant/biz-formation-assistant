import React from 'react';
import './styles/HowItWorks.scss';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="step">
        <div className="step-circle">1</div>
        <p>Step 1</p>
      </div>
      <div className="step">
        <div className="step-circle">2</div>
        <p>Step 2</p>
      </div>
      <div className="step">
        <div className="step-circle">3</div>
        <p>Step 3</p>
      </div>
    </div>
  );
}

export default HowItWorks;
