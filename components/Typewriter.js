import React from 'react';

const TYPE_DURATION = 50;
const SWAP_DURATION = 200;

function Swapper({ before, after, onEnd }) {
  const [running, setRunning] = React.useState(false);
  const ref = React.useRef(false);
  const state = running ? 'running' : 'paused';

  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        height: 'var(--font-size-jumbo)',
        overflowY: 'hidden'
      }}
    >
      <div
        style={{
          color: 'var(--translucent)',
          animation: [
            `swap ${SWAP_DURATION}ms ease-out 0ms both ${state}`,
            `fade ${SWAP_DURATION}ms linear 0ms reverse both ${state}`
          ].join(', '),
          userSelect: 'none'
        }}
        onAnimationEnd={() => {
          // Call onAnimationEnd once per lifecycle
          if (!ref.current && onEnd) {
            onEnd(true);
            ref.current = true;
          }
        }}
      >
        <Type text={before} onEnd={() => setRunning(true)} />
      </div>
      {running && (
        <div
          style={{
            animation: [
              `swap ${SWAP_DURATION}ms ease-out 0ms both running`,
              `fade ${SWAP_DURATION}ms linear 0ms normal both running`
            ].join(', ')
          }}
        >
          {after}
        </div>
      )}
    </span>
  );
}

function Type({ text, onEnd }) {
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    if (state < text.length) {
      const timeout = setTimeout(() => setState((s) => s + 1), TYPE_DURATION);
      return () => clearTimeout(timeout);
    } else {
      onEnd();
    }
  }, [text, state, onEnd]);

  return text.substring(0, state);
}

export function Typewriter({ children: text }) {
  const [state, setState] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const next = React.useCallback(() => setState((s) => s + 1), []);

  return (
    <h1
      className="jumbo"
      style={{
        // Prevent page jump
        height: 280, // TODO fix on smaller screens
        overflow: 'hidden'
      }}
    >
      <title>{text}</title>
      <span className="prefers-no-animation">{text}</span>
      <span aria-hidden="true" className="prefers-animation">
        <Swapper before="# Markdoc" after="Markdoc is" onEnd={next} />
        {state >= 1 && <Type text=" a " onEnd={next} />}
        {state >= 2 && (
          <Swapper before="{% type %}" after="powerful," onEnd={next} />
        )}
        {state >= 3 && (
          <>
            <br />
            <Type text=" flexible Markdown-based " onEnd={next} />
          </>
        )}
        {state >= 4 && (
          <>
            <br />
            <Swapper
              before="{% toolchain %}"
              after="authoring system."
              onEnd={setDone}
            />
          </>
        )}
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <div
            style={{
              position: 'absolute',
              display: 'inline-block',
              top: -64,
              left: '0.75rem',
              width: 8,
              height: 72,
              background: 'var(--theme)',
              animation: done ? 'blink 1060ms step-end infinite' : undefined
            }}
          />
        </span>
      </span>
    </h1>
  );
}
