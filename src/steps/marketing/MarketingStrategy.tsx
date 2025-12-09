import React from 'react';
import './styles/MarketingStrategy.scss';

function MarketingStrategy() {
  return (
    <div className="card--glass step-marketing__card">
      <h3>Marketing Strategy</h3>
      <div className="form-group">
        <label htmlFor="strategy">Marketing strategy:</label>
        <textarea
          id="strategy"
          rows={4}
          placeholder="Outline your marketing strategy…"
        />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Generate strategy
      </button>
    </div>
  );
}

export default MarketingStrategy;
