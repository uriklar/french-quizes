import React from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes } from '../quizzes';

export default function QuizList() {
  const quizzes = getAllQuizzes();

  return (
    <div className="card">
      <h1>Quiz App</h1>
      <p className="subtitle">Choose a quiz to get started</p>
      <div className="quiz-grid">
        {quizzes.map(q => (
          <Link key={q.slug} to={`/quiz/${q.slug}`} className="quiz-card">
            <h2>{q.title}</h2>
            <p>{q.description}</p>
            <div className="meta">{q.questionCount} questions</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
