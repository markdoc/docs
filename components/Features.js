import React from 'react';

export function Features({ features }) {
  return (
    <div className="flex row">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex column equal-width"
          style={{ paddingRight: '2rem' }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '27px',
              letterSpacing: '0.05em',
              paddingBottom: '0.5rem'
            }}
          >
            {feature.title}
          </span>
          <span style={{ fontSize: 18 }}>{feature.description}</span>
        </div>
      ))}
    </div>
  );
}
