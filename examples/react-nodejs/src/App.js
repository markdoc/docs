import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { Callout } from './components/Callout';

function App() {
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    return async () => {
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

      const content = await response.json();
      setContent(content);
    };
  }, []);

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
