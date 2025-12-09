import React from 'react';
import './styles/Resources.scss';

function Resources({ isPremium }) {
  return (
    <div className="card--glass step-concept__card step-concept__resources">
      <h3>Research & Resources</h3>
      <p className="step-concept__hint">
        Use these sources to validate your idea with real market data.
      </p>
      <ul className="step-concept__links">
        <li>
          Industry  IBISWorld, Statista, government SBA data
        </li>
        <li>
          Trend tools: Google Trends, Exploding Topics
        </li>
        <li>
          Communities: Indie Hackers, r/Entrepreneur, niche Slack groups
        </li>
      </ul>
      {!isPremium && (
        <p className="step-concept__upgrade-note">
          Premium adds curated reports and pre‑built research prompts tailored to your concept.
        </p>
      )}
    </div>
  );
}

export default Resources;
