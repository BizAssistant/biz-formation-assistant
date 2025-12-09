import React from 'react';
import './styles/FeaturesGrid.scss';

function FeaturesGrid() {
  return (
    <div className="features-grid">
      <div className="feature-card">
        <h3>Feature 1</h3>
        <p>Description</p>
      </div>
      <div className="feature-card">
        <h3>Feature 2</h3>
        <p>Description</p>
      </div>
      <div className="feature-card">
        <h3>Feature 3</h3>
        <p>Description</p>
      </div>
    </div>
  );
}

export default FeaturesGrid;
