import React from 'react';
import './styles/LegalGuidance.scss';

function LegalGuidance({ isPremium }) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Legal and Regulatory Guidance</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-concept__locked-text">
          Get guidance on legal and regulatory requirements.
        </p>
      )}

      {isPremium && (
        <ul className="step-concept__links">
          <li><a href="https://www.legalguidance.com" target="_blank" rel="noopener noreferrer">Legal Requirements</a></li>
          <li><a href="https://www.regulatoryguidance.com" target="_blank" rel="noopener noreferrer">Regulatory Requirements</a></li>
        </ul>
      )}
    </div>
  );
}

export default LegalGuidance;
