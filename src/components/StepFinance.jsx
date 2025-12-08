import React from 'react';
import '../styles/StepFinance.scss';

function StepFinance({ businessData, updateBusinessData, nextStep, prevStep }) {
  const tools = [
    'Accounting software (QuickBooks, Xero, FreshBooks)',
    'Payment processing (Stripe, Square, PayPal)',
    'Invoicing system',
    'Expense tracking',
    'Payroll system (if hiring)',
    'Business credit card',
  ];

  return (
    <div className="finance-step">
      <h2 className="finance-title">Financial Foundation</h2>
      <div className="finance-form">
        <div>
          <label>Startup Costs</label>
          <input
            type="number"
            value={businessData.startupCosts || ''}
            onChange={(e) =>
              updateBusinessData({ startupCosts: e.target.value })
            }
          />
        </div>
        <div>
          <label>Funding Source</label>
          <select
            value={businessData.fundingSource || ''}
            onChange={(e) =>
              updateBusinessData({ fundingSource: e.target.value })
            }
          >
            <option value="">Select funding source</option>
            <option value="personal">Personal Savings</option>
            <option value="loan">Business Loan</option>
            <option value="investors">Investors</option>
            <option value="crowdfunding">Crowdfunding</option>
            <option value="grants">Grants</option>
            <option value="mixed">Mixed Sources</option>
          </select>
        </div>
        <div>
          <label>Financial Tools Setup</label>
          {tools.map((tool, idx) => (
            <div key={idx} className="finance-tool">
              <input
                type="checkbox"
                checked={businessData[`tool${idx}`] || false}
                onChange={(e) =>
                  updateBusinessData({ [`tool${idx}`]: e.target.checked })
                }
              />
              <span>{tool}</span>
            </div>
          ))}
        </div>
        <div>
          <label>Pricing Strategy</label>
          <textarea
            rows="3"
            value={businessData.pricing || ''}
            onChange={(e) => updateBusinessData({ pricing: e.target.value })}
          />
        </div>
      </div>
      <div className="finance-actions">
        <button onClick={prevStep} className="btn-back">
          Back
        </button>
        <button onClick={nextStep} className="btn-next">
          Next
        </button>
      </div>
    </div>
  );
}

export default StepFinance;
