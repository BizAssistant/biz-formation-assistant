import React from 'react';
import './styles/FinancialPlanning.scss';

interface FinancialPlanningProps {
  isStandard: boolean;
}

function FinancialPlanning({ isStandard }: FinancialPlanningProps) {
  return (
    <div className="card--glass step-financing__card">
      <div className="step-financing__section-header">
        <h3>Financial Planning</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-financing__locked-text">
          Create a detailed financial plan with a guided tool when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="financialPlan">Financial plan:</label>
          <textarea id="financialPlan" rows={3} placeholder="Outline your financial plan…" />
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Generate plan
          </button>
        </div>
      )}
    </div>
  );
}

export default FinancialPlanning;
