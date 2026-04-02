import React, { useState } from 'react';
import { checkMatch } from '../../utils';

export default function Replacement({ q, onAnswer, answered, userAnswer }) {
  const [input, setInput] = useState('');
  const isCorrect = answered && checkMatch(userAnswer, q.correct);

  return (
    <div className="question-block">
      <p className="question-text">
        {q.sentence.replace(q.underlined, '')}
        <span style={{ textDecoration: 'underline', fontWeight: 600 }}>{q.underlined}</span>
      </p>
      <p style={{ fontSize: 14, color: '#666', margin: '2px 0 8px' }}>
        {'\u2192'} Replace <strong>{q.underlined}</strong> with a pronoun and rewrite.
      </p>
      <div className="input-row">
        <input
          className={`input-field ${answered ? (isCorrect ? 'input-correct' : 'input-wrong') : ''}`}
          value={answered ? userAnswer : input}
          onChange={e => setInput(e.target.value)}
          disabled={answered}
          placeholder="Rewrite the full sentence..."
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
      {answered && <p className="explanation">{q.hint}</p>}
      {!answered && <p className="hint">Hint: {q.hint}</p>}
    </div>
  );
}
