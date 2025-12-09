import React from 'react';
import DomainRegistration from './DomainRegistration';
import WebsiteSetup from './WebsiteSetup';
import DNSConfiguration from './DNSConfiguration';
import './styles/index.scss';

interface DomainProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Domain({ plan, onNext }: DomainProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-domain">
      <header className="step-domain__header">
        <h2 className="gradient-text">Domain and Website</h2>
        <p className="step-domain__subtitle">
          Register a domain and set up your business website.
        </p>
      </header>

      <div className="step-domain__layout">
        <section className="step-domain__left">
          <DomainRegistration />
        </section>

        <section className="step-domain__right">
          <WebsiteSetup isStandard={isStandard} />
          <DNSConfiguration isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-domain__footer">
        <button type="button" className="btn-glass step-domain__footer-btn">
          Save domain
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-domain__footer-btn" onClick={onNext}>
          Complete Onboarding
        </button>
      </footer>
    </div>
  );
}

export default Domain;
