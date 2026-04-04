import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizBySlug } from '../quizzes';
import { checkMatch } from '../utils';
import Results from './Results';
import CrashCourse from './CrashCourse';
import MultipleChoice from './questions/MultipleChoice';
import Correction from './questions/Correction';
import Replacement from './questions/Replacement';
import Categorize from './questions/Categorize';
import Translate from './questions/Translate';

const QUESTION_COMPONENTS = {
  multiple_choice: MultipleChoice,
  correction: Correction,
  replacement: Replacement,
  categorize: Categorize,
  translate: Translate,
};

function loadSavedState(slug) {
  try {
    const raw = localStorage.getItem(`quiz-${slug}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveState(slug, state) {
  try {
    localStorage.setItem(`quiz-${slug}`, JSON.stringify(state));
  } catch {}
}

function clearState(slug) {
  try {
    localStorage.removeItem(`quiz-${slug}`);
  } catch {}
}

export default function Quiz() {
  const { slug } = useParams();
  const quiz = getQuizBySlug(slug);
  const saved = loadSavedState(slug);
  const [showCrashCourse, setShowCrashCourse] = useState(saved ? false : true);
  const [currentSection, setCurrentSection] = useState(saved?.currentSection ?? 0);
  const [answers, setAnswers] = useState(saved?.answers ?? {});
  const [showResults, setShowResults] = useState(saved?.showResults ?? false);

  if (!quiz) {
    return (
      <div className="card">
        <h1>Quiz not found</h1>
        <Link to="/" style={{ color: '#4a6cf7' }}>Back to quizzes</Link>
      </div>
    );
  }

  const { sections } = quiz;
  const section = sections[currentSection];
  const sectionKey = (si, qi) => `${si}-${qi}`;

  useEffect(() => {
    saveState(slug, { answers, currentSection, showResults });
  }, [slug, answers, currentSection, showResults]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection, showResults, showCrashCourse]);

  const handleAnswer = (qi, answer) => {
    setAnswers(prev => ({ ...prev, [sectionKey(currentSection, qi)]: answer }));
  };

  const handleReset = useCallback(() => {
    clearState(slug);
    setAnswers({});
    setCurrentSection(0);
    setShowResults(false);
    setShowCrashCourse(!!quiz?.crashCourse);
  }, [slug, quiz]);

  const sectionAnswered = section.questions.every(
    (_, qi) => answers[sectionKey(currentSection, qi)] !== undefined,
  );

  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);

  const totalCorrect = () => {
    let correct = 0;
    sections.forEach((sec, si) => {
      sec.questions.forEach((q, qi) => {
        const a = answers[sectionKey(si, qi)];
        if (a === undefined) return;
        if (sec.type === 'multiple_choice' || sec.type === 'categorize') {
          if (a === q.correct) correct++;
        } else if (sec.type === 'translate') {
          if (checkMatch(a, q.correct, q.alternates)) correct++;
        } else {
          if (checkMatch(a, q.correct)) correct++;
        }
      });
    });
    return correct;
  };

  const allDone = sections.every((sec, si) =>
    sec.questions.every((_, qi) => answers[sectionKey(si, qi)] !== undefined),
  );

  if (showCrashCourse && quiz.crashCourse) {
    return (
      <div className="card">
        <div style={{ marginBottom: 16 }}>
          <Link to="/" style={{ color: '#4a6cf7', fontSize: 13, textDecoration: 'none' }}>&larr; All quizzes</Link>
        </div>
        <CrashCourse crashCourse={quiz.crashCourse} onStart={() => setShowCrashCourse(false)} />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="card">
        <Results
          score={totalCorrect()}
          total={totalQuestions}
          onRetry={handleReset}
        />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Link to="/" style={{ color: '#4a6cf7', fontSize: 14 }}>Back to all quizzes</Link>
        </div>
      </div>
    );
  }

  const QuestionComponent = QUESTION_COMPONENTS[section.type];

  return (
    <div className="card">
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#4a6cf7', fontSize: 13, textDecoration: 'none' }}>&larr; All quizzes</Link>
        {Object.keys(answers).length > 0 && (
          <button
            className="btn"
            onClick={handleReset}
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Reset progress
          </button>
        )}
      </div>
      <h1>{quiz.title}</h1>
      <p className="subtitle">{quiz.description} — {totalQuestions} questions across {sections.length} exercise types</p>

      <div className="section-tabs">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`section-tab ${i === currentSection ? 'section-tab-active' : 'section-tab-inactive'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 20, margin: '0 0 4px', color: '#1a1a1a' }}>{section.title}</h2>
      <p style={{ fontSize: 14, color: '#666', margin: '0 0 20px' }}>{section.instructions}</p>

      {section.questions.map((q, qi) => {
        const key = sectionKey(currentSection, qi);
        return (
          <QuestionComponent
            key={qi}
            q={q}
            answered={answers[key] !== undefined}
            userAnswer={answers[key]}
            onAnswer={a => handleAnswer(qi, a)}
          />
        );
      })}

      <div className="nav-row">
        <button
          className="btn"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          style={{ padding: '10px 20px' }}
        >
          &larr; Previous
        </button>
        {currentSection < sections.length - 1 ? (
          <button
            className={`btn ${sectionAnswered ? 'btn-primary' : ''}`}
            onClick={() => setCurrentSection(currentSection + 1)}
            style={{ padding: '10px 20px' }}
          >
            Next &rarr;
          </button>
        ) : (
          <button
            className={`btn ${allDone ? 'btn-success' : ''}`}
            onClick={() => setShowResults(true)}
            disabled={!allDone}
            style={{ padding: '10px 20px' }}
          >
            See Results
          </button>
        )}
      </div>
    </div>
  );
}
