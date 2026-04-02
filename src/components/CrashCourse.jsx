import React from 'react';

function Table({ headers, rows }) {
  return (
    <div className="cc-table-wrap">
      <table className="cc-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Examples({ items }) {
  return (
    <div className="cc-examples">
      {items.map((ex, i) => (
        <div key={i} className="cc-example">
          <span className="cc-example-fr">{ex.french}</span>
          <span className="cc-example-en">{ex.english}</span>
          {ex.note && <span className="cc-example-note">{ex.note}</span>}
        </div>
      ))}
    </div>
  );
}

function Section({ section }) {
  return (
    <div className="cc-section">
      <h3 className="cc-section-title">{section.title}</h3>
      {section.content && (
        <div className="cc-section-content">
          {section.content.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
      {section.tip && <div className="cc-tip">{section.tip}</div>}
      {section.examples && <Examples items={section.examples} />}
      {section.table && <Table headers={section.table.headers} rows={section.table.rows} />}
      {section.nextStep && <div className="cc-next-step">{section.nextStep}</div>}
    </div>
  );
}

export default function CrashCourse({ crashCourse, onStart }) {
  return (
    <div>
      <h1>{crashCourse.title}</h1>
      <p className="subtitle">{crashCourse.subtitle}</p>
      <div className="cc-body">
        {crashCourse.sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button className="btn btn-primary" onClick={onStart} style={{ padding: '12px 32px', fontSize: 16 }}>
          Start the Quiz &rarr;
        </button>
      </div>
    </div>
  );
}
