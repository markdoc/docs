import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

const options = {
  mode: 'markdown',
  lineWrapping: true,
  lineNumbers: true,
  theme: 'none',
};

export function Editor({ code, onChange }) {
  const [key, setKey] = React.useState(0);

  const onBeforeChange = React.useCallback(
    (editor, meta, code) => onChange(code),
    [onChange]
  );

  React.useEffect(() => {
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/xml/xml');
    setKey((k) => k + 1);
  }, []);

  return (
    <CodeMirror
      key={key}
      value={code}
      options={options}
      onBeforeChange={onBeforeChange}
    />
  );
}
