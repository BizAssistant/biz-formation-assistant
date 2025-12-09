import React from 'react';
import './styles/FinancialProjections.scss';

interface FinancialProjectionsProps {
  isPremium: boolean;
}

function FinancialProjections({ isPremium }: FinancialProjectionsProps) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Financial Projections</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-concept__locked-text">
          Estimate startup costs and potential profits.
        </p>
      )}

      {isPremium && (
        <>
          <div className="form-group">
            <label htmlFor="startupCosts">Startup Costs:</label>
            <input id="startupCosts" type="number" placeholder="e.g. 10000" />
          </div>
          <div className="form-group">
            <label htmlFor="potentialProfits">Potential Profits:</label>
            <input id="potentialProfits" type="number" placeholder="e.g. 50000" />
          </div>
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Calculate projections
          </button>
        </>
      )}
    </div>
  );
}

export default FinancialProjections;
