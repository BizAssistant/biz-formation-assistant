import React from 'react';
import './styles/TaxationIntroduction.scss';

function TaxationIntroduction() {
  return (
    <div className="card--glass step-accounting__card">
      <h3>Business Taxation Introduction</h3>
      <div className="form-group">
        <label htmlFor="taxation">Introduction to business taxation:</label>
        <textarea
          id="taxation"
          rows={4}
          placeholder="Enter introduction to business taxation…"
        />
      </div>
      <p className="step-accounting__hint">
        Cover payroll tax, local tax, state tax, and federal income tax.
      </p>
    </div>
  );
}

export default TaxationIntroduction;
