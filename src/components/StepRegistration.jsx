import React from 'react';

const tasks = [
  'Get an EIN (Employer Identification Number)',
  'Register business name (DBA if needed)',
  'File formation documents with state',
  'Create operating agreement/bylaws',
  'Obtain business licenses and permits',
  'Open business bank account',
  'Get business insurance',
  'Register for state taxes'
];

export default function StepRegistration({ value, onChange }) {
  return (
    <div className="fade-in">
      <h2 className="text-emerald-glow">Business Registration Checklist</h2>
      <p style={{ color: '#9CA3AF' }}>Complete these essential steps to make it official</p>

      <div className="card--glass" style={{ padding: '1rem', marginBottom: '1rem' }}>
        {tasks.map((task, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={value[`task${idx}`] || false}
              onChange={(e) => onChange({ ...value, [`task${idx}`]: e.target.checked })}
            />
            <span style={{ marginLeft: '0.5rem', color: '#E5E7EB' }}>{task}</span>
          </div>
        ))}
      </div>

      <div className="form">
        <label>Registration Notes</label>
        <textarea
          rows={4}
          value={value.notes || ''}
          onChange={(e) => onChange({ ...value, notes: e.target.value })}
          placeholder="Track important details, dates, confirmation numbers..."
        />
      </div>
    </div>
  );
}
