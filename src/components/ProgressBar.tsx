import React from 'react';
import './styles/ProgressBar.scss';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep + 1) / totalSteps * 100;
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
