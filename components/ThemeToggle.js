import React from 'react';

const style = {
  fontSize: '12px',
  lineHeight: '20px'
};

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
    <div style={{ marginLeft: 'auto' }}>
      <button
        style={{
          ...style,
          background: 'var(--contrast-dark)',
          color: 'var(--white)',
          border: '1px solid var(--white)',
          borderRight: 'none'
        }}
        onClick={() => setPreferredTheme('dark')}
      >
        Dark mode
      </button>
      <button
        style={{
          ...style,
          background: 'var(--white)',
          color: 'var(--black)',
          border: '1px solid var(--black)'
        }}
        onClick={() => setPreferredTheme('light')}
      >
        Light mode
      </button>
    </div>
  );
}
