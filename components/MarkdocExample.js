import { Code } from './Code'

export function MarkdocExample({ exampleCode }) {
  return <Code language="markdoc">{exampleCode}</Code>
}

MarkdocExample.displayName = 'MarkdocExample'
