import React from 'react';
import './styles/EINWalkthrough.scss';

function EINWalkthrough() {
  return (
    <div className="card--glass step-registration__card">
      <h3>IRS EIN Registration Walkthrough</h3>
      <div className="form-group">
        <label htmlFor="einWalkthrough">Step-by-step guide:</label>
        <ol className="step-list">
          <li>
            <strong>Visit IRS.gov</strong>: Go to the <a href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" target="_blank" rel="noopener noreferrer">IRS EIN Application</a> page.
          </li>
          <li>
            <strong>Prepare Information</strong>: Gather your business name, address, and responsible party details.
          </li>
          <li>
            <strong>Complete the Application</strong>: Fill out each section of the online form, highlighting key fields.
          </li>
          <li>
            <strong>Submit the Application</strong>: Review and submit the application. You will receive your EIN immediately.
          </li>
          <li>
            <strong>Confirmation and Next Steps</strong>: Save the EIN confirmation and proceed with state and local registration.
          </li>
        </ol>
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Download PDF Guide
      </button>
    </div>
  );
}

export default EINWalkthrough;
