import React from 'react';
import '../styles/ProgressBar.scss';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percent = Math.round(((currentStep + 1) / totalSteps) * 100);
  return (
    <div className="progress">
      <div className="progress__text">{percent}% Complete</div>
      <div className="progress__bar"><div className="progress__fill" style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
