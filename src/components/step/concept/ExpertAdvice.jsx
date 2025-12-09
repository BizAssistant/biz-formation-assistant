import React from 'react';
import './styles/ExpertAdvice.scss';

function ExpertAdvice({ isPremium }) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Expert Advice</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-concept__locked-text">
          Access expert advice and webinars on starting a business.
        </p>
      )}

      {isPremium && (
        <ul className="step-concept__links">
          <li><a href="https://www.webinars.com" target="_blank" rel="noopener noreferrer">Webinars</a></li>
          <li><a href="https://www.experts.com" target="_blank" rel="noopener noreferrer">Expert Q&A</a></li>
        </ul>
      )}
    </div>
  );
}

export default ExpertAdvice;
