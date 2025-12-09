import React from 'react';
import './styles/NameCheck.scss';

interface NameCheckProps {
  isStandard: boolean;
}

function NameCheck({ isStandard }: NameCheckProps) {
  return (
    <div className="card--glass step-name__card">
      <div className="step-name__section-header">
        <h3>Name Availability</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-name__locked-text">
          Check domain and social media availability with a guided tool when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="domainName">Domain name:</label>
          <input id="domainName" type="text" placeholder="e.g. bizform.com" />
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Check availability
          </button>
        </div>
      )}
    </div>
  );
}

export default NameCheck;
