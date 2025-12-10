import React from 'react';
import './styles/AccountingSoftwareSelection.scss';

function AccountingSoftwareSelection() {
  return (
    <div className="card--glass step-accounting__card">
      <h3>Accounting Software Selection</h3>
      <div className="form-group">
        <label htmlFor="software">Select your accounting software:</label>
        <select id="software">
          <option value="quickbooks">QuickBooks</option>
          <option value="xero">Xero</option>
          <option value="freshbooks">FreshBooks</option>
        </select>
      </div>
      <p className="step-accounting__hint">
        Choose the software that best fits your business needs.
      </p>
    </div>
  );
}

export default AccountingSoftwareSelection;
