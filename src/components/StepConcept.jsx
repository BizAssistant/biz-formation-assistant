import React from 'react';
import '../styles/StepConcept.scss';

export default function StepConcept({ value, onChange }) {
  return (
    <div className="fade-in concept-card">
      <h2 className="concept-title">Define Your Business Concept</h2>
      <p className="concept-subtitle">Foundation of your business idea</p>
      <div className="concept-form">
        <div>
          <label>Business Name *</label>
          <input
            type="text"
            value={value.name || ''}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
          />
        </div>
        <div>
          <label>Industry</label>
          <input
            type="text"
            value={value.industry || ''}
            onChange={(e) => onChange({ ...value, industry: e.target.value })}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            rows={4}
            value={value.description || ''}
            onChange={(e) => onChange({ ...value, description: e.target.value })}
          />
        </div>
        <div>
          <label>Target Market</label>
          <textarea
            rows={3}
            value={value.target || ''}
            onChange={(e) => onChange({ ...value, target: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
