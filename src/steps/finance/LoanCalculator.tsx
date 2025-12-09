import React from 'react';
import './styles/LoanCalculator.scss';

interface LoanCalculatorProps {
  isPremium: boolean;
}

function LoanCalculator({ isPremium }: LoanCalculatorProps) {
  return (
    <div className="card--glass step-financing__card">
      <div className="step-financing__section-header">
        <h3>Loan Calculator</h3>
        <span className={`badge ${isPremium ? 'badge--cyan' : 'badge--locked'}`}>
          {isPremium ? 'Premium' : 'Premium feature'}
        </span>
      </div>

      {!isPremium && (
        <p className="step-financing__locked-text">
          Calculate loan payments and compare offers with a guided tool in the Premium plan.
        </p>
      )}

      {isPremium && (
        <div className="form-group">
          <label htmlFor="loanAmount">Loan amount:</label>
          <input id="loanAmount" type="number" placeholder="e.g. 100000" />
          <label htmlFor="interestRate">Interest rate:</label>
          <input id="interestRate" type="number" placeholder="e.g. 5" />
          <label htmlFor="loanTerm">Loan term (years):</label>
          <input id="loanTerm" type="number" placeholder="e.g. 5" />
          <button type="button" className="btn-glass">
            Calculate payments
          </button>
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;
