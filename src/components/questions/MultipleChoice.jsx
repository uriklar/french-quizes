import React from 'react';

export default function MultipleChoice({ q, onAnswer, answered, userAnswer }) {
  return (
    <div className="question-block">
      <p className="question-text">{q.sentence.replace('___', '______')}</p>
      {q.context && <p className="context-text">{q.context}</p>}
      <div className="options-row">
        {q.options.map((opt, i) => {
          let className = 'btn';
          if (answered) {
            if (i === q.correct) className += ' option-correct';
            else if (i === userAnswer && i !== q.correct) className += ' option-wrong';
          }
          return (
            <button
              key={i}
              className={className}
              onClick={() => !answered && onAnswer(i)}
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
