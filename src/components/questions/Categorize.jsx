import React from 'react';

export default function Categorize({ q, onAnswer, answered, userAnswer }) {
  return (
    <div className="question-block">
      <p className="question-text" style={{ marginBottom: 8 }}>
        {q.sentence.split(q.bold).map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && <strong style={{ color: '#4a6cf7', fontSize: 18 }}>{q.bold}</strong>}
          </span>
        ))}
      </p>
      <div className="options-row">
        {q.options.map((opt, i) => {
          let className = 'btn';
          if (answered) {
            if (opt === q.correct) className += ' option-correct';
            else if (opt === userAnswer && opt !== q.correct) className += ' option-wrong';
          }
          return (
            <button
              key={i}
              className={className}
              onClick={() => !answered && onAnswer(opt)}
              style={{ cursor: answered ? 'default' : 'pointer', fontSize: 14 }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
