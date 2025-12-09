import React from 'react';
import './styles/TrendAnalysis.scss';

interface TrendAnalysisProps {
  isStandard: boolean;
}

function TrendAnalysis({ isStandard }: TrendAnalysisProps) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Trend Analysis</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-concept__locked-text">
          Identify emerging trends using tools like Google Trends.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="trend">Trend:</label>
          <input id="trend" type="text" placeholder="e.g. AI, Cybersecurity" />
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Analyze trend
          </button>
        </div>
      )}
    </div>
  );
}

export default TrendAnalysis;
