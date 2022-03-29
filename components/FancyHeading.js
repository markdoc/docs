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
        // TODO remove bottom padding of last paragraph and make the 3rem 4rem
        position: 'relative',
        padding: '3rem 4rem 2.25rem',
        borderWidth: '1px',
        borderColor: 'var(--dark)',
        borderStyle: 'solid solid dashed'
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '43px',
          lineHeight: '49px',
          marginTop: 0,
          padding: '0 3rem var(--default-vertical-spacing) 0',
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </h2>
      {children}
      <Cover top={-5} left={-5} />
      <Cover bottom={-5} left={-5} />
      <Cover top={-5} right={-5} />
      <Cover bottom={-5} right={-5} />
    </div>
  );
}
