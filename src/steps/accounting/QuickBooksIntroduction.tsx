import React from 'react';
import './styles/QuickBooksIntegration.scss';

interface QuickBooksIntegrationProps {
  isPremium: boolean;
}

function QuickBooksIntegration({ isPremium }: QuickBooksIntegrationProps) {
  return (
    <div className="card--glass step-accounting__card">
      <div className="step-accounting__section-header">
        <h3>Intuit QuickBooks Pro Integration</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-accounting__locked-text">
          Integrate Intuit QuickBooks Pro for comprehensive accounting and financial management in the Premium plan.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="quickBooks">QuickBooks API Key:</label>
          <input id="quickBooks" type="text" placeholder="Enter API key…" />
          <button type="button" className="btn-glass">
            Connect QuickBooks
          </button>
        </div>
      )}
    </div>
  );
}

export default QuickBooksIntegration;
