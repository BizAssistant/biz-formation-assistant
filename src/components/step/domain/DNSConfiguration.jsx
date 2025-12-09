import React from 'react';
import './styles/DNSConfiguration.scss';

interface DNSConfigurationProps {
  isPremium: boolean;
}

function DNSConfiguration({ isPremium }: DNSConfigurationProps) {
  return (
    <div className="card--glass step-domain__card">
      <div className="step-domain__section-header">
        <h3>DNS Configuration</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-domain__locked-text">
          Configure DNS settings with a guided tool in the Premium plan.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="dnsSettings">DNS settings:</label>
          <textarea id="dnsSettings" rows={3} placeholder="Enter DNS settings…" />
          <button type="button" className="btn-glass">
            Configure DNS
          </button>
        </div>
      )}
    </div>
  );
}

export default DNSConfiguration;
