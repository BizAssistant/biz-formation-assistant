import React from 'react';

export default function StepWebsite({ value, onChange }) {
  return (
    <div className="fade-in">
      <h2 className="text-emerald-glow">Website & Hosting</h2>
      <p style={{ color: '#9CA3AF' }}>Establish your online presence</p>

      <div className="form">
        <label>Domain</label>
        <input type="text" value={value.domain || ''} onChange={(e) => onChange({ ...value, domain: e.target.value })} />

        <label>Platform</label>
        <input type="text" value={value.platform || ''} onChange={(e) => onChange({ ...value, platform: e.target.value })} />

        <label>Hosting</label>
        <input type="text" value={value.hosting || ''} onChange={(e) => onChange({ ...value, hosting: e.target.value })} />
      </div>
    </div>
  );
}
