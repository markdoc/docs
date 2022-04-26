import * as React from 'react';

const WINDOW_PERCENT = 0.45;

export function Animate({ children }) {
  const ref = React.useRef(false);
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
            color: var(--yellow);
          }

          div :global(.CodeMirror-code) {
            transition: opacity 300ms ease;
            opacity: ${transition ? 1 : 0};
          }

          div :global(.code-animation) {
            border: none;
            position: absolute;
            width: calc(100% - 64px);
            height: calc(100% - 24px);
            top: 24px;
            left: 64px;
            font-family: Flow;
            font-size: 20px;
            line-height: 21px;
            color: #4f4f53;
            white-space: break-spaces;
            transition: opacity 300ms ease;
            opacity: ${transition ? 0 : 1};
          }
        `}
      </style>
    </div>
  );
}
