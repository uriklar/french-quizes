import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="/quiz/:slug" element={<Quiz />} />
    </Routes>
  );
}
