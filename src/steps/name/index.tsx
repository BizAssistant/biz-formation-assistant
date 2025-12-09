import React from 'react';
import NameIdeas from './NameIdeas';
import NameCheck from './NameCheck';
import TrademarkCheck from './TrademarkCheck';
import './styles/index.scss';

interface NameProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Name({ plan, onNext }: NameProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-name">
      <header className="step-name__header">
        <h2 className="gradient-text">Choose Your Business Name</h2>
        <p className="step-name__subtitle">
          Select a unique and memorable name for your business.
        </p>
      </header>

      <div className="step-name__layout">
        <section className="step-name__left">
          <NameIdeas />
        </section>

        <section className="step-name__right">
          <NameCheck isStandard={isStandard} />
          <TrademarkCheck isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-name__footer">
        <button type="button" className="btn-glass step-name__footer-btn">
          Save selection
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-name__footer-btn" onClick={onNext}>
          Continue to Business Registration
        </button>
      </footer>
    </div>
  );
}

export default Name;
