import React from 'react';
import './styles/ProsCons.scss';

interface ProsConsProps {
  isStandard: boolean;
}

function ProsCons({ isStandard }: ProsConsProps) {
  return (
    <div className="card--glass step-structure__card">
      <div className="step-structure__section-header">
        <h3>Pros and Cons</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-structure__locked-text">
          See detailed pros and cons for each structure, including legal and financial implications, when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <>
          <h4 className="step-structure__subheading">Sole Proprietorship</h4>
          <ul className="step-structure__list">
            <li>Easy and inexpensive to set up</li>
            <li>Complete control over the business</li>
            <li>Unlimited personal liability</li>
            <li>Self-employment taxes apply</li>
          </ul>

          <h4 className="step-structure__subheading">LLC</h4>
          <ul className="step-structure__list">
            <li>Limited personal liability</li>
            <li>Flexible tax options</li>
            <li>More complex to set up</li>
            <li>Annual fees and filings</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default ProsCons;
