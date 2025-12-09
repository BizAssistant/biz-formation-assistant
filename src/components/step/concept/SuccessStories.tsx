import React from 'react';
import './styles/SuccessStories.scss';

interface SuccessStoriesProps {
  isStandard: boolean;
}

function SuccessStories({ isStandard }: SuccessStoriesProps) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Success Stories</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-concept__locked-text">
          Read about successful entrepreneurs and their journeys.
        </p>
      )}

      {isStandard && (
        <ul className="step-concept__list">
          <li>Story 1: How they started in tech</li>
          <li>Story 2: How they started in healthcare</li>
          <li>Story 3: How they started in e-commerce</li>
        </ul>
      )}
    </div>
  );
}

export default SuccessStories;
