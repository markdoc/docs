import * as React from 'react';

const svgs = {
  checkmark: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <title>Checkmark</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M416 128L192 384l-96-96"
      />
    </svg>
  ),
  'checkmark-circle': (
    <div className="relative">
      <div
        style={{
          top: 2,
          left: 2,
          zIndex: 1,
          position: 'absolute',
          background: 'var(--black)',
          borderRadius: '50%',
          width: 12,
          height: 12
        }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <title>Checkmark Circle</title>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z" />
      </svg>
    </div>
  ),
  'copy-outline': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <title>Copy</title>
      <rect
        x="128"
        y="128"
        width="336"
        height="336"
        rx="57"
        ry="57"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  ),
  'information-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <title>Information Circle</title>
      <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 16v104h28a16 16 0 010 32z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <title>Warning</title>
      <path d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0080 446.25h340.89a32 32 0 0028.18-47.17zm-198.6-1.83a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.95a21.73 21.73 0 0121.5-22.69h.21a21.74 21.74 0 0121.73 22.7z" />
    </svg>
  )
};

export function Icon({ icon, color = 'inherit' }) {
  return (
    <span
      className="icon"
      style={{
        display: 'inline-block',
        position: 'relative',
        fontSize: 'inherit',
        width: '1em',
        height: '1em',
        minWidth: '16px',
        boxSizing: 'content-box',
        color
      }}
    >
      {svgs[icon] || null}
      <style jsx>
        {`
          .icon :global(svg) {
            z-index: 10; // HACK
            position: relative;
            display: block;
            fill: currentcolor;
            stroke: currentcolor;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </span>
  );
}
