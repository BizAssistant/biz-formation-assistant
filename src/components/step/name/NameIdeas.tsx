import React from 'react';
import './styles/NameIdeas.scss';

function NameIdeas() {
  return (
    <div className="card--glass step-name__card">
      <h3>Name Ideas</h3>
      <p className="step-name__hint">
        Brainstorm unique and memorable names for your business.
      </p>
      <div className="form-group">
        <label htmlFor="nameIdea">Name idea:</label>
        <input id="nameIdea" type="text" placeholder="e.g. BizForm, InsightHunter" />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Generate more ideas
      </button>
    </div>
  );
}

export default NameIdeas;
