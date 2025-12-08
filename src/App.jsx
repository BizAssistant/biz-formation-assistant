import React, { useState } from 'react';
import './styles/StepNavigation.scss'; // Import SCSS

const steps = [
  { id: 'step1', name: 'Step 1' },
  { id: 'step2', name: 'Step 2' },
  { id: 'step3', name: 'Step 3' },
];

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep + 1) / totalSteps * 100;
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

function Step({ step }) {
  return (
    <div>
      <h2>{step.name}</h2>
      <p>Content for {step.name}</p>
    </div>
  );
}

function App() {
  const [current, setCurrent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const goToStep = (idx) => {
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
      <div className="card--dark step-nav">
        <div className="step-buttons">
          {steps.map((s, idx) => {
            const isActive = current === idx;
            const isCompleted = completedSteps.includes(idx);
            return (
              <div key={s.id} className="step-item">
                <button
                  className={'card--glass step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}'}
                  onClick={() => goToStep(idx)}
                  aria-label={`Go to ${s.name}`}
                />
                <span className={'step-label ${isActive ? 'active' : ''}'}>{s.name}</span>
                {idx < steps.length - 1 && (
                  <div className={'step-connector ${isCompleted ? 'completed' : ''}'} />
                )}
              </div>
            );
          })}
        </div>
        <ProgressBar currentStep={current} totalSteps={steps.length} />
      </div>

      <div className="card--dark step-content">
        <Step step={steps[current]} />
      </div>

      <div className="safe-bottom step-actions">
        <button onClick={prevStep} className="card--glass btn-prev">Previous</button>
        <button onClick={nextStep} className="btn-metallic btn-next">
          <span>{current === steps.length - 1 ? 'Complete' : 'Next Step'}</span><span>›</span>
        </button>
      </div>
    </main>
  );
}

export default App;
