import { Code } from './Code';

export function MarkdocExample({ exampleCode, language }) {
  return <Code language={language || 'markdoc'}>{exampleCode}</Code>;
}

MarkdocExample.displayName = 'MarkdocExample';
