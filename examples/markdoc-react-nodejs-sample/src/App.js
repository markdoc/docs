import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { Callout } from './components/Callout';

function App() {
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    return async () => {
      const path = window.location.pathname;
      const response = await fetch(`${path}`, {
        headers: {
          Accept: 'application/json'
        }
      });

      const markdocRenderTree = await response.json();
      setContent(markdocRenderTree);
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
