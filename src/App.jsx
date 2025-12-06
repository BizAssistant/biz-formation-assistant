import React, { useCallback } from 'react';
import './styles/main.scss';
import { steps } from './steps';
import usePersistentState from './hooks/usePersistentState';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import StepConcept from './components/StepConcept';
import StepEntity from './components/StepEntity';
import StepRegistration from './components/StepRegistration';
import StepMarketing from './components/StepMarketing';
import StepFinance from './components/StepFinance';
import StepWebsite from './components/StepWebsite';
import exportPDF from './lib/exportPDF';

export default function App() {
  const [state, setState] = usePersistentState('bizform-state', {
    currentStep: 0,
    completedSteps: [],
    businessData: { concept: {}, entity: {}, registration: {}, marketing: {}, finance: {}, website: {} }
  });
  const totalSteps = steps.length;

  const saveProgress = useCallback(() => {
    fetch('/save-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'demo-user', state })
    });
  }, [state]);

  const markStepComplete = (idx) => {
    if (!state.completedSteps.includes(idx)) {
      setState({ ...state, completedSteps: [...state.completedSteps, idx] });
    }
  };

  const nextStep = () => {
    markStepComplete(state.currentStep);
    if (state.currentStep < totalSteps - 1) setState({ ...state, currentStep: state.currentStep + 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    if (state.currentStep > 0) setState({ ...state, currentStep: state.currentStep - 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToStep = (idx) => {
    setState({ ...state, currentStep: idx });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const updateSection = (section, payload) => setState({ ...state, businessData: { ...state.businessData, [section]: payload } });
  const exportPlan = () => exportPDF(state.businessData);

  const current = state.currentStep;
  const Step = () => {
    switch (current) {
      case 0: return <StepConcept value={state.businessData.concept} onChange={(v) => updateSection('concept', v)} />;
      case 1: return <StepEntity value={state.businessData.entity} onChange={(v) => updateSection('entity', v)} />;
      case 2: return <StepRegistration value={state.businessData.registration} onChange={(v) => updateSection('registration', v)} />;
      case 3: return <StepMarketing value={state.businessData.marketing} onChange={(v) => updateSection('marketing', v)} />;
      case 4: return <StepFinance value={state.businessData.finance} onChange={(v) => updateSection('finance', v)} />;
      case 5: return <StepWebsite value={state.businessData.website} onChange={(v) => updateSection('website', v)} />;
      default: return null;
    }
  };

  return (
    <div>
      <Header onSave={saveProgress} onExport={exportPlan} />
      <main className="safe-top" style={{ maxWidth: 960, margin: '0 auto', padding: '1rem' }}>
        <div className="card--dark" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {steps.map((s, idx) => {
              const isActive = current === idx;
              const isCompleted = state.completedSteps.includes(idx);
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    className="card--glass"
                    onClick={() => goToStep(idx)}
                    style={{
                      width: 48, height: 48, borderRadius: '9999px', marginRight: 8,
                      border: isActive ? '2px solid #10B981' : '1px solid rgba(16,185,129,0.3)',
                      background: isCompleted ? 'linear-gradient(135deg,#10B981 0%,#059669 100%)' : 'rgba(16,185,129,0.1)'
                    }}
                    aria-label={`Go to ${s.name}`}
                  />
                  <span style={{ fontSize: '0.75rem', color: isActive ? '#34D399' : '#9CA3AF', fontWeight: isActive ? 600 : 400 }}>{s.name}</span>
                  {idx < steps.length - 1 && (
                    <div style={{ width: 32, height: 4, borderRadius: 4, margin: '0 8px', background: isCompleted ? 'linear-gradient(90deg,#10B981,#059669)' : 'rgba(16,185,129,0.2)' }} />
                  )}
                </div>
              );
            })}
          </div>
          <ProgressBar currentStep={current} totalSteps={totalSteps} />
        </div>

        <div className="card--dark" style={{ marginBottom: '1rem' }}>
          <Step />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }} className="safe-bottom">
          <button onClick={prevStep} className="card--glass" style={{ borderRadius: 9999, padding: '0.75rem 1.25rem' }}>Previous</button>
          <button onClick={nextStep} className="btn-metallic" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{current === totalSteps - 1 ? 'Complete' : 'Next Step'}</span><span>›</span>
          </button>
        </div>
      </main>
    </div>
  );
}
