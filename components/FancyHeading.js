import React from 'react';

function Cover({ top, left, bottom, right }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: 10,
        height: 10,
        background: 'var(--contrast-gray)',
        top,
        left,
        bottom,
        right
      }}
    />
  );
}

export function FancyHeading({ title, children }) {
  return (
    <div
      className="flex center-vertical"
      style={{
        position: 'relative',
        padding: '3rem 4rem',
        borderWidth: '1px',
        borderColor: 'var(--dark)',
        borderStyle: 'solid solid dashed'
      }}
    >
      <Cover top={-5} left={-5} />
      <Cover bottom={-5} left={-5} />
      <Cover top={-5} right={-5} />
      <Cover bottom={-5} right={-5} />
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '43px',
          fontWeight: 400,
          lineHeight: '49px',
          marginTop: 0,
          paddingRight: '3rem',
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
