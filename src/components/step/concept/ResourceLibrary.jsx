import React from 'react';
import './styles/ResourceLibrary.scss';

function ResourceLibrary({ isPremium }) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Resource Library</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-concept__locked-text">
          Access templates, guides, and checklists.
        </p>
      )}

      {isPremium && (
        <ul className="step-concept__links">
          <li><a href="https://www.templates.com" target="_blank" rel="noopener noreferrer">Templates</a></li>
          <li><a href="https://www.guides.com" target="_blank" rel="noopener noreferrer">Guides</a></li>
          <li><a href="https://www.checklists.com" target="_blank" rel="noopener noreferrer">Checklists</a></li>
        </ul>
      )}
    </div>
  );
}

export default ResourceLibrary;
