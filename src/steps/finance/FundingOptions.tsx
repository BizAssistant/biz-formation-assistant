import React from 'react';
import './styles/FundingOptions.scss';

function FundingOptions() {
  return (
    <div className="card--glass step-financing__card">
      <h3>Funding Options</h3>
      <div className="form-group">
        <label htmlFor="fundingType">Funding type:</label>
        <select id="fundingType">
          <option value="loans">Loans</option>
          <option value="investors">Investors</option>
          <option value="grants">Grants</option>
          <option value="crowdfunding">Crowdfunding</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fundingAmount">Amount needed:</label>
        <input id="fundingAmount" type="number" placeholder="e.g. 50000" />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Find funding
      </button>
    </div>
  );
}

export default FundingOptions;
