import React from 'react';
import FundingOptions from './FundingOptions';
import FinancialPlanning from './FinancialPlanning';
import LoanCalculator from './LoanCalculator';
import './styles/index.scss';

interface FinancingProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Financing({ plan, onNext }: FinancingProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-financing">
      <header className="step-financing__header">
        <h2 className="gradient-text">Business Financing</h2>
        <p className="step-financing__subtitle">
          Secure funding and set up your business banking.
        </p>
      </header>

      <div className="step-financing__layout">
        <section className="step-financing__left">
          <FundingOptions />
        </section>

        <section className="step-financing__right">
          <FinancialPlanning isStandard={isStandard} />
          <LoanCalculator isPremium={isPremium} />
        </section>
      </div>

      <footer className="step-financing__footer">
        <button type="button" className="btn-glass step-financing__footer-btn">
          Save financing plan
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-financing__footer-btn" onClick={onNext}>
          Continue to Marketing
        </button>
      </footer>
    </div>
  );
}

export default Financing;
