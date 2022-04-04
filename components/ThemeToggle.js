import React from 'react';

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
      <button className="dark" onClick={() => setPreferredTheme('dark')}>
        Dark mode
      </button>
      <button className="light" onClick={() => setPreferredTheme('light')}>
        Light mode
      </button>
      <style jsx>
        {`
          .theme-toggle {
            margin-left: auto;
          }
          button {
            font-size: 12px;
            line-height: 20px;
          }
          .dark {
            background: var(--contrast-dark);
            color: var(--white);
            border: 1px solid var(--white);
            border-right: none;
          }
          .light {
            background: var(--white);
            color: var(--black);
            border: 1px solid var(--black);
          }
        `}
      </style>
    </div>
  );
}
