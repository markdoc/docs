import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { Callout } from './components/Callout';

function App() {
  const [content, setContent] = React.useState(null);
  const [show404, setShow404] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        `/markdoc-api?` +
          new URLSearchParams({
            path: window.location.pathname
          }),
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );

      if (response.status === 404) {
        setShow404(true);
        return;
      }

      const content = await response.json();
      setContent(content);
    })();
  }, []);

  if (show404) {
    return <p>Page not found.</p>;
  }

  if (!content) {
    return <p>Loading...</p>;
  }

  const components = {
    Callout
  };
  return Markdoc.renderers.react(content, React, {
    components
  });
}

export default App;
