import React, { useState } from 'react';
import { checkMatch } from '../../utils';

export default function Correction({ q, onAnswer, answered, userAnswer }) {
  const [input, setInput] = useState('');
  const isCorrect = answered && checkMatch(userAnswer, q.correct);

  return (
    <div className="question-block">
      <p className="question-text">
        {'\u274C'} <span style={{ fontStyle: 'italic' }}>{q.sentence}</span>
      </p>
      {q.context && <p className="context-text">{q.context}</p>}
      <div className="input-row">
        <input
          className={`input-field ${answered ? (isCorrect ? 'input-correct' : 'input-wrong') : ''}`}
          value={answered ? userAnswer : input}
          onChange={e => setInput(e.target.value)}
          disabled={answered}
          placeholder="Write the corrected sentence..."
          onKeyDown={e => e.key === 'Enter' && input.trim() && onAnswer(input.trim())}
        />
        {!answered && (
          <button className="btn btn-primary" onClick={() => input.trim() && onAnswer(input.trim())}>
            Check
          </button>
        )}
      </div>
      {answered && !isCorrect && (
        <p className="correct-answer">Correct answer: <strong>{q.correct}</strong></p>
      )}
      {answered && <p className="explanation">{q.errorType}</p>}
      {!answered && <p className="hint">Hint: {q.hint}</p>}
    </div>
  );
}
