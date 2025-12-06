import React from 'react';

export default function StepMarketing({ value, onChange }) {
  return (
    <div className="fade-in">
      <h2 className="text-emerald-glow">Initial Marketing Strategy</h2>
      <p style={{ color: '#9CA3AF' }}>Plan how you'll reach your first customers</p>

      <div className="form">
        <label>Unique Value Proposition</label>
        <textarea rows={3} value={value.uvp || ''} onChange={(e) => onChange({ ...value, uvp: e.target.value })} />

        <label>Monthly Budget ($)</label>
        <input type="number" value={value.budget || ''} onChange={(e) => onChange({ ...value, budget: e.target.value })} />

        <label>90-Day Plan</label>
        <textarea rows={3} value={value.plan90 || ''} onChange={(e) => onChange({ ...value, plan90: e.target.value })} />
      </div>
    </div>
  );
}
