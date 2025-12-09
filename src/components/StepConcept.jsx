import React from 'react';
import './styles/StepConcept.scss';

function StepConcept({ plan, onNext }) {
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
        {/* LEFT: core form + quiz */}
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

          <div className="card--glass step-concept__card step-concept__quiz">
            <div className="step-concept__section-header">
              <h3>Idea Discovery Quiz</h3>
              <span className="badge badge--cyan">Included in all plans</span>
            </div>
            <p className="step-concept__hint">
              Not sure where to start? Answer a few questions and get tailored idea suggestions.
            </p>
            <div className="form-group">
              <label htmlFor="quizHobbies">What are your hobbies?</label>
              <input id="quizHobbies" type="text" placeholder="e.g. cars, music, finance, gaming" />
            </div>
            <div className="form-group">
              <label htmlFor="quizSkills">What skills do you have?</label>
              <input id="quizSkills" type="text" placeholder="e.g. coding, sales, design, operations" />
            </div>
            <div className="form-group">
              <label htmlFor="quizInterests">What industries interest you?</label>
              <input id="quizInterests" type="text" placeholder="e.g. fintech, healthcare, e‑commerce" />
            </div>
            <button type="button" className="btn-metallic btn-metallic--shimmer">
              Generate idea suggestions
            </button>
          </div>
        </section>

        {/* RIGHT: research panels, some gated by tier */}
        <section className="step-concept__right">
          {/* Profitable & fast-growing industries (Standard+) */}
          <div className="card--glass step-concept__card">
            <div className="step-concept__section-header">
              <h3>High‑Potential Industries</h3>
              <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
                {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
              </span>
            </div>

            {!isStandard && (
              <p className="step-concept__locked-text">
                See curated lists of the most profitable and fastest‑growing industries, plus key stats, when you
                upgrade to Standard or Premium.
              </p>
            )}

            {isStandard && (
              <>
                <h4 className="step-concept__subheading">Top 10 most profitable (sample)</h4>
                <ol className="step-concept__list">
                  <li>Vertical SaaS (niche B2B software)</li>
                  <li>Healthcare services & telehealth</li>
                  <li>Specialized e‑commerce (high‑margin niches)</li>
                  <li>Renewable energy services</li>
                  <li>Financial advisory & fintech tools</li>
                  <li>Online education & cohort courses</li>
                  <li>Property management & real‑estate services</li>
                  <li>Digital media & content subscriptions</li>
                  <li>Food & beverage concepts with delivery focus</li>
                  <li>Logistics & last‑mile delivery tools</li>
                </ol>

                <h4 className="step-concept__subheading">Fastest‑growing segments (sample)</h4>
                <ol className="step-concept__list step-concept__list--compact">
                  <li>AI‑assisted tools (dev, marketing, ops)</li>
                  <li>Cybersecurity for small businesses</li>
                  <li>Creator economy tooling</li>
                  <li>Remote work infrastructure & HR tech</li>
                  <li>Climate & sustainability solutions</li>
                </ol>
              </>
            )}
          </div>

          {/* Market gap helper (Premium) */}
          <div className="card--glass step-concept__card">
            <div className="step-concept__section-header">
              <h3>Market Gap Helper</h3>
              <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
                {isPremium ? 'Premium' : 'Premium feature'}
              </span>
            </div>

            {!isPremium && (
              <p className="step-concept__locked-text">
                Map competitors and uncover underserved niches with a guided market gap checklist in the Premium plan.
              </p>
            )}

            {isPremium && (
              <>
                <p className="step-concept__hint">
                  List 3–5 competitors and note who they ignore. The tool highlights potential gaps.
                </p>
                <div className="form-group">
                  <label htmlFor="competitors">Key competitors</label>
                  <textarea
                    id="competitors"
                    rows={3}
                    placeholder="List competitors and what they do well / poorly…"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="underserved">Underserved customers or use‑cases</label>
                  <textarea
                    id="underserved"
                    rows={3}
                    placeholder="Who is not well‑served today? e.g. micro‑SaaS founders, non‑profits, etc."
                  />
                </div>
                <button type="button" className="btn-glass">
                  Highlight potential gaps
                </button>
              </>
            )}
          </div>

          {/* Resources (all plans, with light upsell) */}
          <div className="card--glass step-concept__card step-concept__resources">
            <h3>Research & Resources</h3>
            <p className="step-concept__hint">
              Use these sources to validate your idea with real market data.
            </p>
            <ul className="step-concept__links">
              <li>
                Industry  IBISWorld, Statista, government SBA data
              </li>
              <li>
                Trend tools: Google Trends, Exploding Topics
              </li>
              <li>
                Communities: Indie Hackers, r/Entrepreneur, niche Slack groups
              </li>
            </ul>
            {!isPremium && (
              <p className="step-concept__upgrade-note">
                Premium adds curated reports and pre‑built research prompts tailored to your concept.
              </p>
            )}
          </div>
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

export default StepConcept;
