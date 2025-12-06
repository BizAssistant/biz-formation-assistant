import React from 'react';

export default function Header({ onSave, onExport }) {
  return (
    <header className="card--dark" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="safe-top" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <img src="/logo.png" alt="BizForm" width="32" height="32" />
          <div>
            <h1 className="text-orange-glow" style={{ fontWeight: 700 }}>BizForm</h1>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Powered by InsightHunter</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="card--glass" onClick={onSave} title="Save Progress" style={{ padding: '0.5rem', borderRadius: '9999px' }}>
            <span className="text-emerald-glow" style={{ fontWeight: 600 }}>Save</span>
          </button>
          <button className="card--glass" onClick={onExport} title="Export PDF" style={{ padding: '0.5rem', borderRadius: '9999px' }}>
            <span className="text-emerald-glow" style={{ fontWeight: 600 }}>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
}
