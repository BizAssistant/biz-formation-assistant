<main className="safe-top app-main">
  <div className="card--dark step-nav">
    <div className="step-buttons">
      {steps.map((s, idx) => {
        const isActive = current === idx;
        const isCompleted = state.completedSteps.includes(idx);
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
    <ProgressBar currentStep={current} totalSteps={totalSteps} />
  </div>

  <div className="card--dark step-content">
    <Step />
  </div>

  <div className="safe-bottom step-actions">
    <button onClick={prevStep} className="card--glass btn-prev">Previous</button>
    <button onClick={nextStep} className="btn-metallic btn-next">
      <span>{current === totalSteps - 1 ? 'Complete' : 'Next Step'}</span><span>›</span>
    </button>
  </div>
</main>
