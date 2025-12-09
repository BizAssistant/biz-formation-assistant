import React from 'react';
import './styles/CostComparison.scss';

interface CostComparisonProps {
  isPremium: boolean;
}

function CostComparison({ isPremium }: CostComparisonProps) {
  return (
    <div className="card--glass step-structure__card">
      <div className="step-structure__section-header">
        <h3>Cost Comparison</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-structure__locked-text">
          Compare detailed setup and ongoing costs for each structure with a guided cost calculator in the Premium plan.
        </p>
      )}

      {isPremium && (
        <>
          <p className="step-structure__hint">
            Enter your estimated annual revenue to see a breakdown of setup and ongoing costs for each structure.
          </p>
          <div className="form-group">
            <label htmlFor="annualRevenue">Estimated annual revenue:</label>
            <input id="annualRevenue" type="number" placeholder="e.g. 100000" />
          </div>
          <button type="button" className="btn-glass">
            Calculate costs
          </button>
        </>
      )}
    </div>
  );
}

export default CostComparison;
