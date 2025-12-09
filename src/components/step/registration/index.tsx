import React from 'react';
import RegistrationForm from './RegistrationForm';
import ComplianceCheck from './ComplianceCheck';
import StateComparison from './StateComparison';
import './styles/index.scss';

interface RegistrationProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Registration({ plan, onNext }: RegistrationProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-registration">
      <header className="step-registration__header">
        <h2 className="gradient-text">Business Registration</h2>
        <p className="step-registration__subtitle">
          Register your business with the appropriate authorities.
        </p>
      </header>

      <div className="step-registration__layout">
        <section className="step-registration__left">
          <RegistrationForm />
        </section>

        <section className="step-registration__right">
          <ComplianceCheck isStandard={isStandard} />
          <StateComparison isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-registration__footer">
        <button type="button" className="btn-glass step-registration__footer-btn">
          Save registration
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-registration__footer-btn" onClick={onNext}>
          Continue to Financing
        </button>
      </footer>
    </div>
  );
}

export default Registration;
