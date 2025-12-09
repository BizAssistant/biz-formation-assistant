import React from 'react';
import './styles/ComplianceCheck.scss';

interface ComplianceCheckProps {
  isStandard: boolean;
}

function ComplianceCheck({ isStandard }: ComplianceCheckProps) {
  return (
    <div className="card--glass step-registration__card">
      <div className="step-registration__section-header">
        <h3>Compliance Check</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-registration__locked-text">
          Ensure your business meets all compliance requirements with a guided checklist when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="complianceCheck">Check compliance:</label>
          <textarea id="complianceCheck" rows={3} placeholder="List compliance items…" />
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Validate compliance
          </button>
        </div>
      )}
    </div>
  );
}

export default ComplianceCheck;
