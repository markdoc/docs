import React from 'react';

const TYPING_DELAY = 40;
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
          ].join(', ')
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
      const timeout = setTimeout(() => {
        setState((s) => s + 1);
      }, TYPING_DELAY);

      return () => clearTimeout(timeout);
    } else {
      onEnd();
    }
  }, [text, state, onEnd]);

  return text.substring(0, state);
}

export function Typewriter() {
  const [state, setState] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const next = React.useCallback(() => setState((s) => s + 1), []);

  return (
    <h1
      className="jumbo"
      style={{
        // Prevent page jump
        height: 280,
        overflow: 'hidden'
      }}
    >
      <Swapper before="# Markdoc" after="Markdoc is" onEnd={next} />
      {state >= 1 && <Type text=" a " onEnd={next} />}
      {state >= 2 && (
        <Swapper before="{% type %}" after="powerful," onEnd={next} />
      )}
      {state >= 3 && <br />}
      {state >= 3 && <Type text=" flexible Markdown-based " onEnd={next} />}
      {state >= 4 && <br />}
      {state >= 4 && (
        <Swapper
          before="{% toolchain %}"
          after="authoring system."
          onEnd={setDone}
        />
      )}
      <span
        style={{
          position: 'relative',
          top: '+10px',
          background: 'var(--theme)',
          display: 'inline-block',
          width: 8,
          height: 72,
          marginLeft: '0.75rem',
          animation: done ? 'blink 1060ms step-end infinite' : undefined
        }}
      />
    </h1>
  );
}
