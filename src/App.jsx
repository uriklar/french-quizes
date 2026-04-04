import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:slug" element={<Quiz />} />
      </Routes>
    </>
  );
}
