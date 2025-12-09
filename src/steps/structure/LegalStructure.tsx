import React from 'react';
import './styles/LegalStructure.scss';

function LegalStructure() {
  return (
    <div className="card--glass step-structure__card">
      <h3>Legal Structure Options</h3>
      <div className="form-group">
        <label htmlFor="legalStructure">Select your legal structure:</label>
        <select id="legalStructure" name="legalStructure">
          <option value="soleProprietorship">Sole Proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="llc">LLC</option>
          <option value="corporation">Corporation</option>
        </select>
      </div>
      <p className="step-structure__hint">
        Each structure has different implications for liability, taxes, and compliance.
      </p>
    </div>
  );
}

export default LegalStructure;
