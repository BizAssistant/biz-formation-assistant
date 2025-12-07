import React from 'react';
import '../styles/StepRegistration.scss';

function StepRegistration({ businessData, updateBusinessData, nextStep, prevStep }) {
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
    <div className="registration-step">
      <h2 className="registration-title">Business Registration Checklist</h2>
      <div className="registration-list">
        {tasks.map((task, idx) => (
          <div key={idx} className="registration-task">
            <input
              type="checkbox"
              checked={businessData[`task${idx}`] || false}
              onChange={(e) =>
                updateBusinessData({ [`task${idx}`]: e.target.checked })
              }
              className="form-checkbox"
            />
            <label>{task}</label>
          </div>
        ))}
      </div>
      <div className="registration-actions">
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

export default StepRegistration;
