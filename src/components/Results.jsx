import React from 'react';

export default function Results({ score, total, onRetry }) {
  const pct = Math.round((score / total) * 100);
  let message = '';
  if (pct >= 90) message = "Excellent! You've got a strong grasp of this topic.";
  else if (pct >= 70) message = 'Good work! A few areas to review, but the foundation is solid.';
  else if (pct >= 50) message = "You're getting there — review the explanations for the ones you missed.";
  else message = "This is a tough topic. Review and try again — you'll improve fast.";

  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{pct >= 70 ? '\u{1F389}' : '\u{1F4DA}'}</div>
      <h2 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>{score} / {total}</h2>
      <p style={{ fontSize: 16, color: '#555', margin: '0 0 20px' }}>{message}</p>
      <button className="btn btn-primary" onClick={onRetry} style={{ padding: '10px 24px', fontSize: 15 }}>
        Try Again
      </button>
    </div>
  );
}
