import React from 'react';

function FinanceStep({ businessData, updateBusinessData, nextStep, prevStep }) {
  const tools = [
    'Accounting software (QuickBooks, Xero, FreshBooks)',
    'Payment processing (Stripe, Square, PayPal)',
    'Invoicing system',
    'Expense tracking',
    'Payroll system (if hiring)',
    'Business credit card',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-glow">
        Financial Foundation
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Startup Costs
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            value={businessData.startupCosts || ''}
            onChange={(e) =>
              updateBusinessData({ startupCosts: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Funding Source
          </label>
          <select
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
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
          <label className="block text-sm font-medium text-slate-300">
            Financial Tools Setup
          </label>
          {tools.map((tool, idx) => (
            <div key={idx} className="flex items-center space-x-3 mb-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-purple-600 hover:accent-cyan-400 transition"
                checked={businessData[`tool${idx}`] || false}
                onChange={(e) =>
                  updateBusinessData({ [`tool${idx}`]: e.target.checked })
                }
              />
              <label className="text-sm text-slate-200">{tool}</label>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Pricing Strategy
          </label>
          <textarea
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            rows="3"
            value={businessData.pricing || ''}
            onChange={(e) => updateBusinessData({ pricing: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg shadow-[0_0_12px_rgba(6,182,212,0.6)] hover:scale-105 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FinanceStep;
