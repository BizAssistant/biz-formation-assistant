import React from 'react';
import './styles/Quiz.scss';

function Quiz({ onNext }) {
  return (
    <div className="quiz-container">
      <h2>Find Your Ideal Business Idea</h2>
      <div className="form-group">
        <label htmlFor="hobbies">What are your hobbies?</label>
        <input type="text" id="hobbies" name="hobbies" />
      </div>
      <div className="form-group">
        <label htmlFor="skills">What skills do you have?</label>
        <input type="text" id="skills" name="skills" />
      </div>
      <div className="form-group">
        <label htmlFor="interests">What industries interest you?</label>
        <input type="text" id="interests" name="interests" />
      </div>
      <button onClick={onNext} className="btn-metallic">Next Step</button>
    </div>
  );
}

export default Quiz;
