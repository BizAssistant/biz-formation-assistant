import React from 'react';
import LegalStructure from './LegalStructure';
import ProsCons from './ProsCons';
import CostComparison from './CostComparison';
import './styles/index.scss';

interface StructureProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Structure({ plan, onNext }: StructureProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-structure">
      <header className="step-structure__header">
        <h2 className="gradient-text">Choose Your Business Structure</h2>
        <p className="step-structure__subtitle">
          Select the legal structure that best fits your business needs.
        </p>
      </header>

      <div className="step-structure__layout">
        <section className="step-structure__left">
          <LegalStructure />
        </section>

        <section className="step-structure__right">
          <ProsCons isStandard={isStandard} />
          <CostComparison isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-structure__footer">
        <button type="button" className="btn-glass step-structure__footer-btn">
          Save selection
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-structure__footer-btn" onClick={onNext}>
          Continue to Business Name
        </button>
      </footer>
    </div>
  );
}

export default Structure;
