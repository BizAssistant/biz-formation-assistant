import React from 'react';

function RegistrationStep({ businessData, updateBusinessData, nextStep, prevStep }) {
  const tasks = [
    'Get an EIN (Employer Identification Number)',
    'Register business name (DBA if needed)',
    'File formation documents with state',
    'Create operating agreement/bylaws',
    'Obtain business licenses and permits',
    'Open business bank account',
    'Get business insurance',
    'Register for state taxes',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-glow">
        Business Registration Checklist
      </h2>
      <div className="space-y-4">
        {tasks.map((task, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={businessData[`task${idx}`] || false}
              onChange={(e) =>
                updateBusinessData({ [`task${idx}`]: e.target.checked })
              }
              className="w-5 h-5 accent-purple-600 hover:accent-cyan-400 transition"
            />
            <label className="text-slate-300">{task}</label>
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

export default RegistrationStep;
