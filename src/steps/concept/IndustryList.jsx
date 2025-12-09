import React from 'react';
import './styles/IndustryList.scss';

function IndustryList({ isStandard }) {
  return (
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
  );
}

export default IndustryList;
