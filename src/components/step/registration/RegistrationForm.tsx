import React from 'react';
import './styles/RegistrationForm.scss';

function RegistrationForm() {
  return (
    <div className="card--glass step-registration__card">
      <h3>Registration Form</h3>
      <div className="form-group">
        <label htmlFor="businessName">Business Name:</label>
        <input id="businessName" type="text" placeholder="e.g. BizForm" />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <select id="state">
          <option value="ga">Georgia</option>
          <option value="ny">New York</option>
          <option value="ca">California</option>
          <option value="tx">Texas</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input id="address" type="text" placeholder="e.g. 123 Main St" />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Register business
      </button>
    </div>
  );
}

export default RegistrationForm;
