import React from 'react';
import AccountingSoftwareSelection from './AccountingSoftwareSelection';
import FinancialSoftwareSetup from './FinancialSoftwareSetup';
import InsightHunterIntegration from './InsightHunterIntegration';
import QuickBooksIntegration from './QuickBooksIntegration';
import TaxationIntroduction from './TaxationIntroduction';
import './styles/index.scss';

interface AccountingProps {
  plan: 'free' | 'standard' | 'premium';
  onNext: () => void;
}

function Accounting({ plan, onNext }: AccountingProps) {
  const isStandard = plan === 'standard' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div className="step-accounting">
      <header className="step-accounting__header">
        <h2 className="gradient-text">Accounting</h2>
        <p className="step-accounting__subtitle">
          Select and set up your accounting software, and learn about business taxation.
        </p>
      </header>

      <div className="step-accounting__layout">
        <section className="step-accounting__left">
          <AccountingSoftwareSelection />
          <FinancialSoftwareSetup />
          <InsightHunterIntegration isStandard={isStandard} />
          <QuickBooksIntegration isPremium={isPremium} />
        </section>

        <section className="step-accounting__right">
          <TaxationIntroduction />
        </section>
      </div>

      <footer className="step-accounting__footer">
        <button type="button" className="btn-glass step-accounting__footer-btn">
          Save accounting setup
        </button>
        <button type="button" className="btn-metallic btn-metallic--shimmer step-accounting__footer-btn" onClick={onNext}>
          Continue to Marketing
        </button>
      </footer>
    </div>
  );
}

export default Accounting;
