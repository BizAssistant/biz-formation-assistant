import React from 'react';
import './styles/PersonalizedRecommendations.scss';

interface PersonalizedRecommendationsProps {
  isPremium: boolean;
}

function PersonalizedRecommendations({ isPremium }: PersonalizedRecommendationsProps) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Personalized Recommendations</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-concept__locked-text">
          Get personalized business idea recommendations.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="userInput">Tell us about yourself:</label>
          <textarea id="userInput" name="userInput" rows={4} cols={50}></textarea>
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Get recommendations
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonalizedRecommendations;
