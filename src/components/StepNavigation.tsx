import React from 'react';
import './styles/StepNavigation.scss';

interface StepNavigationProps {
  steps: { id: string; name: string }[];
  current: number;
  completedSteps: number[];
  goToStep: (idx: number) => void;
}

function StepNavigation({ steps, current, completedSteps, goToStep }: StepNavigationProps) {
  return (
    <div className="card--dark step-nav">
      <div className="step-buttons">
        {steps.map((s, idx) => {
          const isActive = current === idx;
          const isCompleted = completedSteps.includes(idx);
          return (
            <div key={s.id} className="step-item">
              <button
                className={`card--glass step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => goToStep(idx)}
                aria-label={`Go to ${s.name}`}
              />
              <span className={`step-label ${isActive ? 'active' : ''}`}>{s.name}</span>
              {idx < steps.length - 1 && (
                <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepNavigation;
