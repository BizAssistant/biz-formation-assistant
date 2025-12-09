import React from 'react';
import './styles/MarketGapAnalysis.scss';

function MarketGapAnalysis({ isStandard }) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Market Gap Analysis</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-concept__locked-text">
          Identify gaps in the market by analyzing competitors and finding underserved niches.
        </p>
      )}

      {isStandard && (
        <>
          <div className="form-group">
            <label htmlFor="competitors">Competitors:</label>
            <input id="competitors" type="text" placeholder="e.g. Competitor A, Competitor B" />
          </div>
          <div className="form-group">
            <label htmlFor="underservedNiches">Underserved Niches:</label>
            <input id="underservedNiches" type="text" placeholder="e.g. Micro-SaaS, Non-profits" />
          </div>
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Find gaps
          </button>
        </>
      )}
    </div>
  );
}

export default MarketGapAnalysis;
