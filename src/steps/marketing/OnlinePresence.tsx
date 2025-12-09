import React from 'react';
import './styles/OnlinePresence.scss';

interface OnlinePresenceProps {
  isPremium: boolean;
}

function OnlinePresence({ isPremium }: OnlinePresenceProps) {
  return (
    <div className="card--glass step-marketing__card">
      <div className="step-marketing__section-header">
        <h3>Online Presence</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-marketing__locked-text">
          Set up your online presence with a guided tool in the Premium plan.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="websiteUrl">Website URL:</label>
          <input id="websiteUrl" type="text" placeholder="e.g. bizform.com" />
          <label htmlFor="socialMedia">Social media:</label>
          <input id="socialMedia" type="text" placeholder="e.g. @bizform" />
          <button type="button" className="btn-glass">
            Set up online presence
          </button>
        </div>
      )}
    </div>
  );
}

export default OnlinePresence;
