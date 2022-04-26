import * as React from 'react';

const WINDOW_PERCENT = 0.45;
const DURATION = 450;

export function Animate({ children }) {
  const ref = React.useRef(false);
  const [transition, startTransition] = React.useState(false);

  React.useLayoutEffect(() => {
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
          div :global(.CodeMirror-code),
          div :global(.code-animation),
          div :global(.preview-animation + .preview),
          div :global(.preview-animation) {
            transition: opacity ${DURATION}ms ease;
          }

          div :global(.CodeMirror-line),
          div :global(.preview-animation + .preview) {
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
            opacity: ${transition ? 0 : 1};
          }

          div :global(.preview-animation) {
            position: absolute;
            font-family: Flow;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: ${transition ? 0 : 1};
          }

          div :global(.preview-animation .preview p),
          div :global(.preview-animation .preview li) {
            color: var(--gray-medium);
            list-style: none;
          }

          div :global(.preview-animation .preview a) {
            text-decoration: none;
          }

          div :global(.preview-animation .preview .heading) {
            color: #bdc7ca;
          }
        `}
      </style>
    </div>
  );
}
