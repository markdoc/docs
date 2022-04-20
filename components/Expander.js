import * as React from 'react';

const SCALING_FACTOR = 0.08;

export function Expander({ children }) {
  const ref = React.useRef(false);
  const [scale, setScale] = React.useState(1);

  React.useLayoutEffect(() => {
    let frame;
    function handler() {
      const el = ref.current;
      if (el) {
        frame = requestAnimationFrame(() => {
          const fullHeight = window.innerHeight;
          const dimensions = el.getBoundingClientRect();

          const elCenter = dimensions.top + dimensions.height / 2;
          const pageCenter = fullHeight / 2;

          const x = (elCenter - pageCenter) / fullHeight;

          // y = 0.08 * (-(2x)^2 + 1)
          const y = SCALING_FACTOR * (-Math.pow(2 * x, 2) + 1);

          // Keep scale between 0 and SCALING_FACTOR
          setScale(Math.min(Math.max(y, 0), SCALING_FACTOR));
        });
      }
    }
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler, { passive: true });
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref}>
      {children}
      <style jsx>
        {`
          div {
            transform-origin: center center;
            transform: scale(${1 + scale});
          }
        `}
      </style>
    </div>
  );
}
