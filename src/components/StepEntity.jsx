import React from 'react';
import '../styles/EntityStep.scss';

function EntityStep({ businessData, updateBusinessData, nextStep, prevStep }) {
  const entities = [
    { type: 'LLC', desc: 'Limited Liability Company' },
    { type: 'Corporation', desc: 'C-Corp or S-Corp structure' },
    { type: 'Sole Proprietorship', desc: 'Simplest for solo owners' },
    { type: 'Partnership', desc: 'Multiple owner structure' },
  ];

  return (
    <div className="entity-step">
      <h2 className="entity-title">Choose Your Business Entity</h2>
      <div className="entity-options">
        {entities.map((entityType) => (
          <div
            key={entityType.type}
            onClick={() => updateBusinessData({ type: entityType.type })}
            className={`entity-card ${
              businessData.type === entityType.type ? 'selected' : ''
            }`}
          >
            <h3 className="entity-name">{entityType.type}</h3>
            <p className="entity-desc">{entityType.desc}</p>
          </div>
        ))}
      </div>
      <div className="entity-actions">
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

export default EntityStep;

