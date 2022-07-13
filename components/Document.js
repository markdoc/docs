import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { Editor, useMarkdocCode } from './Sandbox';
import { EditPagePanel } from './EditPagePanel';

function EditPage({ source: initialDocument }) {
  const [doc, setDoc] = React.useState(initialDocument);
  const { content, config, errors } = useMarkdocCode(doc);

  const [docChanged, setDocChanged] = React.useState(false);

  const [prNumber, setPrNumber] = React.useState(null);

  const createPR = async () => {
    const filename = window.CURRENT_FILENAME;

    const files = {
      [filename]: doc
    };

    console.log(files);

    const body = JSON.stringify({ files });

    const response = await fetch('/api/create-pr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });

    const prNumber = await response.json();
    setPrNumber(prNumber);

    return prNumber;
  };

  return (
    <>
      {Markdoc.renderers.react(content.children, React, {
        components: config.components
      })}
      <EditPagePanel docChanged={docChanged} createPR={createPR}>
        <Editor
          code={doc}
          onChange={(...args) => {
            setDocChanged(true);
            setDoc(...args);
          }}
          errors={errors}
        />
      </EditPagePanel>
    </>
  );
}

export function Document({ source, children }) {
  /**
   * Typically you would just render children here, but we are adding
   * this extra branch in order to pop up the editor that reveals
   * the source content for each document
   */
  return <article>{source ? <EditPage source={source} /> : children}</article>;
}
