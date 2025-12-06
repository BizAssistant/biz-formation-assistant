import React from 'react';

function MarketingStep({ businessData, updateBusinessData, nextStep, prevStep }) {
  const channels = [
    'Social Media',
    'Email Marketing',
    'SEO',
    'Paid Ads',
    'Content Marketing',
    'Networking',
    'Referrals',
    'PR',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-glow">
        Marketing Strategy
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Unique Value Proposition
          </label>
          <textarea
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            rows="3"
            value={businessData.uvp || ''}
            onChange={(e) => updateBusinessData({ uvp: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Marketing Channels
          </label>
          <div className="grid grid-cols-2 gap-3">
            {channels.map((channel) => (
              <label
                key={channel}
                className="flex items-center space-x-2 text-slate-200"
              >
                <input
                  type="checkbox"
                  checked={businessData.channels?.[channel] || false}
                  onChange={(e) => {
                    const channels = {
                      ...businessData.channels,
                      [channel]: e.target.checked,
                    };
                    updateBusinessData({ channels });
                  }}
                  className="w-4 h-4 accent-purple-600 hover:accent-cyan-400 transition"
                />
                <span className="text-sm">{channel}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Initial Marketing Budget
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            value={businessData.budget || ''}
            onChange={(e) => updateBusinessData({ budget: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            90-Day Marketing Plan
          </label>
          <textarea
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            rows="4"
            value={businessData.plan90 || ''}
            onChange={(e) => updateBusinessData({ plan90: e.target.value })}
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

export default MarketingStep;
