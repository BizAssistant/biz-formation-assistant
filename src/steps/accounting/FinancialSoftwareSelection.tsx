import React from 'react';
import './styles/FinancialSoftwareSetup.scss';

function FinancialSoftwareSetup() {
  return (
    <div className="card--glass step-accounting__card">
      <h3>Financial Software Setup</h3>
      <div className="form-group">
        <label htmlFor="setup">Setup instructions:</label>
        <textarea
          id="setup"
          rows={4}
          placeholder="Enter setup instructions…"
        />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Generate setup instructions
      </button>
    </div>
  );
}

export default FinancialSoftwareSetup;
