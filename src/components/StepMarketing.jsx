import React from 'react';
import '../styles/StepMarketing.scss';

function StepMarketing({ businessData, updateBusinessData, nextStep, prevStep }) {
  const channels = [
    'Social Media',
    'Email Marketing',
    'SEO',
    'Paid Ads',
    'Content Marketing',
    'Networking',
    'Referrals',
    'PR',
  ];

  return (
    <div className="marketing-step">
      <h2 className="marketing-title">Marketing Strategy</h2>
      <div className="marketing-form">
        <div>
          <label>Unique Value Proposition</label>
          <textarea
            rows="3"
            value={businessData.uvp || ''}
            onChange={(e) => updateBusinessData({ uvp: e.target.value })}
          />
        </div>
        <div>
          <label>Marketing Channels</label>
          <div className="channels-grid">
            {channels.map((channel) => (
              <label key={channel} className="channel-option">
                <input
                  type="checkbox"
                  checked={businessData.channels?.[channel] || false}
                  onChange={(e) => {
                    const channels = {
                      ...businessData.channels,
                      [channel]: e.target.checked,
                    };
                    updateBusinessData({ channels });
                  }}
                />
                <span>{channel}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Initial Marketing Budget</label>
          <input
            type="number"
            value={businessData.budget || ''}
            onChange={(e) => updateBusinessData({ budget: e.target.value })}
          />
        </div>
        <div>
          <label>90-Day Marketing Plan</label>
          <textarea
            rows="4"
            value={businessData.plan90 || ''}
            onChange={(e) => updateBusinessData({ plan90: e.target.value })}
          />
        </div>
      </div>
      <div className="marketing-actions">
        <button onClick={prevStep} className="btn-back">
          Back
        </button>
        <button onClick={nextStep} className="btn-next">
          Next
        </button>
      </div>
    </div>
  );
}

export default StepMarketing;
