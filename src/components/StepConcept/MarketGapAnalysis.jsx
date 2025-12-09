import React from 'react';
import './styles/MarketGapAnalysis.scss';

function MarketGapAnalysis({ onNext }) {
  return (
    <div className="market-gap-analysis-container">
      <h2>Market Gap Analysis</h2>
      <p>Identify gaps in the market by analyzing competitors and finding underserved niches.</p>
      <div className="form-group">
        <label htmlFor="competitors">Competitors:</label>
        <input type="text" id="competitors" name="competitors" />
      </div>
      <div className="form-group">
        <label htmlFor="underservedNiches">Underserved Niches:</label>
        <input type="text" id="underservedNiches" name="underservedNiches" />
      </div>
      <button onClick={onNext} className="btn-metallic">Next Step</button>
    </div>
  );
}

export default MarketGapAnalysis;
