import React from 'react';
import './styles/SuccessStories.scss';

function SuccessStories({ onNext }) {
  return (
    <div className="success-stories-container">
      <h2>Success Stories</h2>
      <p>Read about successful entrepreneurs and their journeys.</p>
      <ul>
        <li>Story 1: How they started in tech</li>
        <li>Story 2: How they started in healthcare</li>
        <li>Story 3: How they started in e-commerce</li>
      </ul>
      <button onClick={onNext} className="btn-metallic">Next Step</button>
    </div>
  );
}

export default SuccessStories;
