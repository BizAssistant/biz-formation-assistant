import React from 'react';
import './styles/Quiz.scss';

function Quiz() {
  return (
    <div className="card--glass step-concept__card">
      <h3>Idea Discovery Quiz</h3>
      <span className="badge badge--cyan">Included in all plans</span>
      <p className="step-concept__hint">
        Not sure where to start? Answer a few questions and get tailored idea suggestions.
      </p>
      <div className="form-group">
        <label htmlFor="quizHobbies">What are your hobbies?</label>
        <input id="quizHobbies" type="text" placeholder="e.g. cars, music, finance, gaming" />
      </div>
      <div className="form-group">
        <label htmlFor="quizSkills">What skills do you have?</label>
        <input id="quizSkills" type="text" placeholder="e.g. coding, sales, design, operations" />
      </div>
      <div className="form-group">
        <label htmlFor="quizInterests">What industries interest you?</label>
        <input id="quizInterests" type="text" placeholder="e.g. fintech, healthcare, e‑commerce" />
      </div>
      <button type="button" className="btn-metallic btn-metallic--shimmer">
        Generate idea suggestions
      </button>
    </div>
  );
}

export default Quiz;
