import React from 'react';
import Quiz from './Quiz.jsx';
import IndustryList from './IndustryList.jsx';
import MarketGapHelper from './MarketGapHelper.jsx';
import Resources from './Resources.jsx';
import './styles/index.scss';

function Concept({ plan, onNext }) {
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
          <div className="card--glass step-concept__card">
            <h3>Core Concept</h3>
            <div className="form-group">
              <label htmlFor="businessConcept">Business concept</label>
              <textarea
                id="businessConcept"
                name="businessConcept"
                rows={4}
                placeholder="Describe what your business will do and who it will serve…"
              />
            </div>
            <div className="form-group">
              <label htmlFor="targetMarket">Target market</label>
              <input
                id="targetMarket"
                name="targetMarket"
                type="text"
                placeholder="e.g. freelancers, restaurant owners, SaaS founders"
              />
            </div>
          </div>

          <Quiz />
        </section>

        <section className="step-concept__right">
          <IndustryList isStandard={isStandard} />
          <MarketGapHelper isPremium={isPremium} />
          <Resources isPremium={isPremium} />
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
