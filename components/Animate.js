import * as React from 'react';

const WINDOW_PERCENT = 0.45;
const DELAY_MS = 75;

export function Animate({ children }) {
  const ref = React.useRef(false);
  const called = React.useRef(false);
  const [transition, startTransition] = React.useState(false);

  React.useEffect(() => {
    function handler() {
      const el = ref.current;
      if (el) {
        const fullHeight = window.innerHeight;
        const dimensions = el.getBoundingClientRect();
        if (dimensions.top < fullHeight * WINDOW_PERCENT) {
          startTransition(true);
        }

        const code = el.querySelector('.CodeMirror');
        if (code && !called.current) {
          code.querySelectorAll('.CodeMirror-line').forEach((line, i) => {
            const delay = i * DELAY_MS;
            line
              .querySelectorAll("span[role='presentation'], .cm-link, .cm-url")
              .forEach((presentation) => {
                presentation.style.transition = `color 300ms ease ${delay}ms`;
              });
          });
        }
      }
    }

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler, { passive: true });
    };
  }, [transition]);

  return (
    <div ref={ref}>
      {children}
      <style jsx>
        {`
          div :global(span.cm-keyword),
          div :global(span.cm-tag),
          div :global(span.cm-string) {
            color: inherit;
          }

          div :global(span.cm-link),
          div :global(span.cm-url) {
            color: ${transition ? 'var(--yellow)' : 'inherit'};
          }

          div :global(span[role='presentation']) {
            ${transition ? '' : `color: #4F4F53 !important;`};
          }
        `}
      </style>
    </div>
  );
}
