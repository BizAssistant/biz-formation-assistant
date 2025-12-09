import React from 'react';
import './styles/StateComparison.scss';

interface StateComparisonProps {
  isPremium: boolean;
}

function StateComparison({ isPremium }: StateComparisonProps) {
  return (
    <div className="card--glass step-registration__card">
      <div className="step-registration__section-header">
        <h3>State Comparison</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-registration__locked-text">
          Compare registration requirements and costs across states with a guided tool in the Premium plan.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="stateComparison">Select states to compare:</label>
          <select id="stateComparison" multiple>
            <option value="ga">Georgia</option>
            <option value="ny">New York</option>
            <option value="ca">California</option>
            <option value="tx">Texas</option>
          </select>
          <button type="button" className="btn-glass">
            Compare states
          </button>
        </div>
      )}
    </div>
  );
}

export default StateComparison;
