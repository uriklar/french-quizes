import React, { useMemo } from 'react';

function shuffleOptions(options) {
  return [...options].sort(() => Math.random() - 0.5);
}

export default function MultipleChoice({ q, onAnswer, answered, userAnswer }) {
  const shuffledOptions = useMemo(() => shuffleOptions(q.options), [q]);
  const correctOption = q.options[q.correct];
  const selectedOption = typeof userAnswer === 'number' ? q.options[userAnswer] : userAnswer;

  return (
    <div className="question-block">
      <p className="question-text">{q.sentence.replace('___', '______')}</p>
      {q.context && <p className="context-text">{q.context}</p>}
      <div className="options-row">
        {shuffledOptions.map((opt, i) => {
          let className = 'btn';
          if (answered) {
            if (opt === correctOption) className += ' option-correct';
            else if (opt === selectedOption && opt !== correctOption) className += ' option-wrong';
          }
          return (
            <button
              key={`${opt}-${i}`}
              className={className}
              onClick={() => !answered && onAnswer(opt)}
              style={{ cursor: answered ? 'default' : 'pointer' }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered && <p className="explanation">{q.explanation}</p>}
    </div>
  );
}
