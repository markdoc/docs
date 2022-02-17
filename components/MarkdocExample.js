import { Code } from './Code';

export function MarkdocExample({ exampleCode, language }) {
  return <Code language={language}>{exampleCode}</Code>;
}

MarkdocExample.displayName = 'MarkdocExample';
