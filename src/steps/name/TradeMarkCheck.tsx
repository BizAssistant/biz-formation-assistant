import React from 'react';
import './styles/TrademarkCheck.scss';

interface TrademarkCheckProps {
  isPremium: boolean;
}

function TrademarkCheck({ isPremium }: TrademarkCheckProps) {
  return (
    <div className="card--glass step-name__card">
      <div className="step-name__section-header">
        <h3>Trademark Check</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-name__locked-text">
          Ensure your name is not already trademarked with a guided tool in the Premium plan.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="trademarkName">Trademark name:</label>
          <input id="trademarkName" type="text" placeholder="e.g. BizForm" />
          <button type="button" className="btn-glass">
            Check trademark
          </button>
        </div>
      )}
    </div>
  );
}

export default TrademarkCheck;
