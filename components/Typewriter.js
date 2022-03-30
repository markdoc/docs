import React from 'react';

const DELAY = 40;
// TODO turn on animation
const ANIMATE = false;

export function Typewriter({ children: text }) {
  const initialText = ANIMATE ? text.split(' ')[0] : text;

  const [state, setState] = React.useState(initialText.length);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (state < text.length) {
      const timeout = setInterval(() => {
        setState((s) => s + 1);
      }, DELAY);

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [text, state]);

  return (
    <h1 className="jumbo">
      {text.substring(0, state)}
      {ANIMATE ? (
        <span
          style={{
            color: 'var(--theme)',
            fontSize: '72px',
            marginLeft: '0.5rem',
            borderRight: '8px solid var(--theme)',
            animation: done ? 'blink 1s step-end infinite' : undefined
          }}
        />
      ) : (
        false
      )}
    </h1>
  );
}
