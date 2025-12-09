import React from 'react';
import './styles/Networking.scss';

function Networking({ isStandard }) {
  return (
    <div className="card--glass step-concept__card">
      <div className="step-concept__section-header">
        <h3>Networking and Community</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-concept__locked-text">
          Connect with communities and forums to discuss ideas and get feedback.
        </p>
      )}

      {isStandard && (
        <ul className="step-concept__links">
          <li><a href="https://www.linkedin.com/groups" target="_blank" rel="noopener noreferrer">LinkedIn Groups</a></li>
          <li><a href="https://www.reddit.com/r/Entrepreneur" target="_blank" rel="noopener noreferrer">Reddit Entrepreneur</a></li>
        </ul>
      )}
    </div>
  );
}

export default Networking;
