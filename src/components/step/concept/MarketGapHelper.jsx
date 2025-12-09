import React from 'react';
import './styles/MarketGapHelper.scss';

function MarketGapHelper({ isPremium }) {
  return (
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
  );
}

export default MarketGapHelper;
