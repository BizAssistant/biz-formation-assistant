import React, { useState } from 'react';
import StepNavigation from './StepNavigation';
import ProgressBar from './ProgressBar';
import './styles/Main.scss';

const steps = [
  { id: 'step1', name: 'Concept' },
  { id: 'step2', name: 'Structure' },
  { id: 'step3', name: 'Name' },
  { id: 'step4', name: 'Registration' },
  { id: 'step5', name: 'Financing' },
  { id: 'step6', name: 'Accounting' },
  { id: 'step7', name: 'Marketing' },
  { id: 'step8', name: 'Domain' }
];

function Main() {
  const [current, setCurrent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const goToStep = (idx: number) => {
    setCurrent(idx);
  };

  const prevStep = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const nextStep = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
      setCompletedSteps([...completedSteps, current]);
    }
  };

  return (
    <main className="safe-top app-main">
      <StepNavigation
        steps={steps}
        current={current}
        completedSteps={completedSteps}
        goToStep={goToStep}
      />
      <ProgressBar currentStep={current} totalSteps={steps.length} />
      <div className="card--dark step-content">
        <h2>{steps[current].name}</h2>
        <p>Content for {steps[current].name}</p>
      </div>
      <div className="safe-bottom step-actions">
        <button onClick={prevStep} className="card--glass btn-prev">
          Previous
        </button>
        <button onClick={nextStep} className="btn-metallic btn-next">
          <span>{current === steps.length - 1 ? 'Complete' : 'Next Step'}</span>
          <span>›</span>
        </button>
      </div>
    </main>
  );
}

export default Main;

