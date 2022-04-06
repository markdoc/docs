import React from 'react';

const sun = (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8.79932" cy="8" r="4" fill="var(--black)" />
    <circle cx="8.79932" cy="1" r="1" fill="var(--black)" />
    <circle cx="8.79932" cy="15" r="1" fill="var(--black)" />
    <circle
      cx="1.79932"
      cy="8"
      r="1"
      transform="rotate(-90 1.79932 8)"
      fill="var(--black)"
    />
    <circle
      cx="15.7993"
      cy="8"
      r="1"
      transform="rotate(-90 15.7993 8)"
      fill="var(--black)"
    />
    <circle
      cx="3.84927"
      cy="3.05078"
      r="1"
      transform="rotate(-45 3.84927 3.05078)"
      fill="var(--black)"
    />
    <circle
      cx="13.7487"
      cy="12.9503"
      r="1"
      transform="rotate(-45 13.7487 12.9503)"
      fill="var(--black)"
    />
    <circle
      cx="3.84961"
      cy="12.9491"
      r="1"
      transform="rotate(-135 3.84961 12.9491)"
      fill="var(--black)"
    />
    <circle
      cx="13.749"
      cy="3.04957"
      r="1"
      transform="rotate(-135 13.749 3.04957)"
      fill="var(--black)"
    />
  </svg>
);

const moon = (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3764 9.04656C11.2112 9.06022 11.0441 9.06718 10.8754 9.06718C7.56173 9.06718 4.87549 6.38093 4.87549 3.06728C4.87549 1.94653 5.18278 0.897541 5.71771 -1.22983e-05C2.52866 0.186293 0 2.83147 0 6.06725C0 9.42391 2.7211 12.145 6.07776 12.145C8.35189 12.145 10.3343 10.896 11.3764 9.04656Z"
      fill="var(--white)"
    />
  </svg>
);

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(undefined);

  function setPreferredTheme(newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {
      //
    }
  }

  React.useEffect(() => {
    let preferredTheme;
    try {
      preferredTheme = localStorage.getItem('theme');
    } catch (err) {
      //
    }

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkQuery.addListener((e) => setTheme(e.matches ? 'dark' : 'light'));

    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
  }, []);

  React.useEffect(() => {
    if (theme) {
      document.body.className = theme;
    }
  }, [theme]);

  return (
    <div className="theme-toggle">
      <button
        className={theme}
        onClick={() => setPreferredTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? moon : sun}
        {theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </button>
      <style jsx>
        {`
          .theme-toggle {
            margin-left: auto;
          }
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            font-size: 12px;
            line-height: 20px;
            border-radius: 3px;
            font-weight: 400;
            font-size: 15px;
            line-height: 27px;
          }
          button :global(svg) {
            margin-right: 8px;
          }
          .dark {
            background: var(--contrast-dark);
            color: var(--white);
          }
          .light {
            background: var(--gray-3);
            color: var(--black);
          }
        `}
      </style>
    </div>
  );
}
