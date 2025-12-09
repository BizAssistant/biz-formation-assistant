import React from 'react';
import './styles/DomainRegistration.scss';

function DomainRegistration() {
  return (
    <div className="card--glass step-domain__card">
      <h3>Domain Registration</h3>
      <div className="form-group">
        <label htmlFor="domainName">Domain name:</label>
        <input id="domainName" type="text" placeholder="e.g. bizform.com" />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Register domain
      </button>
    </div>
  );
}

export default DomainRegistration;
