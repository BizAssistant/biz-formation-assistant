import React from 'react';

function EntityStep({ businessData, updateBusinessData, nextStep, prevStep }) {
  const entities = [
    { type: 'LLC', desc: 'Limited Liability Company' },
    { type: 'Corporation', desc: 'C-Corp or S-Corp structure' },
    { type: 'Sole Proprietorship', desc: 'Simplest for solo owners' },
    { type: 'Partnership', desc: 'Multiple owner structure' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-glow">
        Choose Your Business Entity
      </h2>
      <div className="space-y-4">
        {entities.map((entityType) => (
          <div
            key={entityType.type}
            onClick={() => updateBusinessData({ type: entityType.type })}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              businessData.type === entityType.type
                ? 'border-purple-500 bg-purple-900/30 shadow-[0_0_12px_rgba(124,58,237,0.6)]'
                : 'border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.6)]'
            }`}
          >
            <h3 className="font-bold text-cyan-300">{entityType.type}</h3>
            <p className="text-sm text-slate-400">{entityType.desc}</p>
          </div>
        ))}
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

export default EntityStep;
