import React from 'react';
import Link from 'next/link';

export default function AppLink(props) {
  const target =
    props.target || (props.href.startsWith('http') ? '_blank' : undefined);
  const Component = target === '_blank' ? 'a' : Link;

  return <Component {...props} target={target} />;
}
