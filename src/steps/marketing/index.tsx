import React from 'react';
import MarketingStrategy from './MarketingStrategy';
import Branding from './Branding';
import OnlinePresence from './OnlinePresence';
import './styles/index.scss';

interface MarketingProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Marketing({ plan, onNext }: MarketingProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-marketing">
      <header className="step-marketing__header">
        <h2 className="gradient-text">Marketing</h2>
        <p className="step-marketing__subtitle">
          Develop a marketing strategy, create a brand, and set up your online presence.
        </p>
      </header>

      <div className="step-marketing__layout">
        <section className="step-marketing__left">
          <MarketingStrategy />
        </section>

        <section className="step-marketing__right">
          <Branding isStandard={isStandard} />
          <OnlinePresence isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-marketing__footer">
        <button type="button" className="btn-glass step-marketing__footer-btn">
          Save marketing plan
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-marketing__footer-btn" onClick={onNext}>
          Complete Onboarding
        </button>
      </footer>
    </div>
  );
}

export default Marketing;
