import React from 'react';
export default function StepEntity({ value, onChange }) {
  return (
    <div className="fade-in">
      <h2 className="text-emerald-glow">Entity Selection</h2>
      <p style={{ color: '#9CA3AF' }}>Choose the right legal structure</p>
      <div className="form" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        <div><label>Type</label><input type="text" value={value.type || ''} onChange={(e) => onChange({ ...value, type: e.target.value })} /></div>
        <div><label>State</label><input type="text" value={value.state || ''} onChange={(e) => onChange({ ...value, state: e.target.value })} /></div>
      </div>
    </div>
  );
}
