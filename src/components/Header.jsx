
import React from 'react';
import '../styles/Header.scss';

export default function Header({ onSave, onExport }) {
  return (
    <header className="header card--dark safe-top">
      <div className="header__inner">
        <div className="header__brand">
          <img src="/logo.png" alt="BizForm" width="32" height="32" />
          <div>
            <h1 className="header__title">BizForm</h1>
            <p className="header__subtitle">Powered by InsightHunter</p>
          </div>
        </div>
        <div className="header__actions">
          <button className="btn-glass" onClick={onSave} title="Save Progress">
            <span className="btn-text">Save</span>
          </button>
          <button className="btn-glass" onClick={onExport} title="Export PDF">
            <span className="btn-text">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
}
