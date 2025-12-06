import React from 'react';

export default function StepFinance({ value, onChange }) {
  return (
    <div className="fade-in">
      <h2 className="text-emerald-glow">Financial Setup</h2>
      <p style={{ color: '#9CA3AF' }}>Plan your startup costs and funding</p>

      <div className="form">
        <label>Startup Costs ($)</label>
        <input type="number" value={value.startupCosts || ''} onChange={(e) => onChange({ ...value, startupCosts: e.target.value })} />

        <label>Funding Source</label>
        <input type="text" value={value.fundingSource || ''} onChange={(e) => onChange({ ...value, fundingSource: e.target.value })} />

        <label>Pricing Strategy</label>
        <textarea rows={3} value={value.pricing || ''} onChange={(e) => onChange({ ...value, pricing: e.target.value })} />
      </div>
    </div>
  );
}
