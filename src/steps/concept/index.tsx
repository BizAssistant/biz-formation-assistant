import React from 'react';
import Quiz from './Quiz';
import MarketGapAnalysis from './MarketGapAnalysis';
import SuccessStories from './SuccessStories';
import TrendAnalysis from './TrendAnalysis';
import FinancialProjections from './FinancialProjections';
import Networking from './Networking';
import ExpertAdvice from './ExpertAdvice';
import ResourceLibrary from './ResourceLibrary';
import LegalGuidance from './LegalGuidance';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import './styles/index.scss';

interface ConceptProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Concept({ plan, onNext }: ConceptProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-concept">
      <header className="step-concept__header">
        <h2 className="gradient-text">Define Your Business Concept</h2>
        <p className="step-concept__subtitle">
          Capture your idea, then explore data-driven insights to choose a high‑potential niche.
        </p>
      </header>

      <div className="step-concept__layout">
        <section className="step-concept__left">
          <Quiz />
          <MarketGapAnalysis isStandard={isStandard} />
          <SuccessStories isStandard={isStandard} />
          <TrendAnalysis isStandard={isStandard} />
          <FinancialProjections isPremium={isPremium} />
        </section>

        <section className="step-concept__right">
          <Networking isStandard={isStandard} />
          <ExpertAdvice isPremium={isPremium} />
          <ResourceLibrary isPremium={isPremium} />
          <LegalGuidance isPremium={isPremium} />
          <PersonalizedRecommendations isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-concept__footer">
        <button type="button" className="btn-glass step-concept__footer-btn">
          Save concept
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-concept__footer-btn" onClick={onNext}>
          Continue to Business Structure
        </button>
      </footer>
    </div>
  );
}

export default Concept;
