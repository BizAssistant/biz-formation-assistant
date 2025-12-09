import React from 'react';
import './styles/WebsiteSetup.scss';

interface WebsiteSetupProps {
  isStandard: boolean;
}

function WebsiteSetup({ isStandard }: WebsiteSetupProps) {
  return (
    <div className="card--glass step-domain__card">
      <div className="step-domain__section-header">
        <h3>Website Setup</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-domain__locked-text">
          Set up your website with a guided tool when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="websiteTemplate">Website template:</label>
          <select id="websiteTemplate">
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Set up website
          </button>
        </div>
      )}
    </div>
  );
}

export default WebsiteSetup;
