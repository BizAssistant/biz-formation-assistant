import React from 'react';
import './styles/InsightHunterIntegration.scss';

interface InsightHunterIntegrationProps {
  isStandard: boolean;
}

function InsightHunterIntegration({ isStandard }: InsightHunterIntegrationProps) {
  return (
    <div className="card--glass step-accounting__card">
      <div className="step-accounting__section-header">
        <h3>Insight Hunter Integration</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-accounting__locked-text">
          Integrate Insight Hunter for advanced financial analytics and reporting when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="insightHunter">Insight Hunter API Key:</label>
          <input id="insightHunter" type="text" placeholder="Enter API key…" />
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Connect Insight Hunter
          </button>
        </div>
      )}
    </div>
  );
}

export default InsightHunterIntegration;
