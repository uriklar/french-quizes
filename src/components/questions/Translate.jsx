import React, { useState } from 'react';
import { checkMatch } from '../../utils';

export default function Translate({ q, onAnswer, answered, userAnswer }) {
  const [input, setInput] = useState('');
  const isCorrect = answered && checkMatch(userAnswer, q.correct, q.alternates);

  return (
    <div className="question-block">
      <p className="question-text" style={{ marginBottom: 8 }}>
        {'\u{1F1EC}\u{1F1E7}'} <em>{q.english}</em>
      </p>
      <div className="input-row">
        <input
          className={`input-field ${answered ? (isCorrect ? 'input-correct' : 'input-wrong') : ''}`}
          value={answered ? userAnswer : input}
          onChange={e => setInput(e.target.value)}
          disabled={answered}
          placeholder="Écrivez en français..."
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
