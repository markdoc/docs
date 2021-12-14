import Image from 'next/image';
import Link from 'next/link';

const defaultTags = {
  image: {
    tag: 'Image',
    description: 'Displays an image',
    attributes: {
      src: {
        description: 'The path of the image to display',
        type: String,
        errorLevel: 'critical',
        required: true,
      },
      alt: {
        description: 'The alt text for the image',
        type: String,
        required: true,
      },
      width: {
        type: Number,
        description:
          'The width of the image expressed as a percentage of the page. If not specified, defaults to 100% (unless a height is set)',
        required: true,
      },
      height: {
        type: String,
        description:
          'The height of the image expressed using any CSS-compatible units',
        required: true,
      },
      layout: {
        type: String,
        matches: ['intrinsic', 'fixed', 'responsive', 'fill'],
      },
      srcSet: {
        type: String,
      },
      sizes: {
        type: String,
      },
      priority: {
        type: Number,
      },
      quality: {
        type: Number,
      },
      placeholder: {
        type: String,
        matches: ['blur', 'empty'],
      },
      objectFit: {
        type: String,
      },
      objectPosition: {
        type: String,
      },
      loading: {
        type: String,
        matches: ['lazy', 'eager'],
      },
      blurDataURL: {
        type: String,
      },
      lazyBoundary: {
        type: String,
      },
      unoptimized: {
        type: Boolean,
      },
    },
  },
  link: {
    tag: 'Link',
    description: 'Displays a Next.js link',
    attributes: {
      href: {
        description: 'The path or URL to navigate to.',
        type: String,
        errorLevel: 'critical',
        required: true,
      },
      as: {
        description:
          'Optional decorator for the path that will be shown in the browser URL bar.',
        type: String,
      },
      passHref: {
        description: 'Forces Link to send the href property to its child.',
        type: Boolean,
        default: false,
      },
      prefetch: {
        description: 'Prefetch the page in the background.',
        type: Boolean,
        default: true,
      },
      replace: {
        description:
          'Replace the current history state instead of adding a new url into the stack.',
        type: Boolean,
        default: false,
      },
      scroll: {
        description: 'Scroll to the top of the page after a navigation.',
        type: Boolean,
        default: true,
      },
      shallow: {
        description:
          'Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps.',
        type: Boolean,
        default: true,
      },
      locale: {
        description: 'The active locale is automatically prepended.',
        type: Boolean,
      },
    },
  },
};

const defaultComponents = {
  Image,
  Link,
};

export function transformSchema(schema) {
  const tags = {};
  const nodes = {};

  Object.entries(schema).forEach(([autoTagName, registration]) => {
    const {node, component, ...schema} = registration;
    const tag = registration.tag || autoTagName;
    const value = {
      ...schema,
      tag: component ? component.displayName || component.name : undefined,
    };
    if (typeof node === 'string') {
      if (nodes[node]) {
        throw new Error(`Node already declared: ${node}`);
      }
      nodes[node] = value;
    } else {
      if (tags[tag]) {
        throw new Error(`Tag already declared: ${tag}`);
      }
      tags[tag] = value;
    }
  });

  return {
    functions: {},
    variables: {},
    nodes,
    tags: {
      ...defaultTags,
      ...tags,
    },
  };
}

export function transformComponents(schema) {
  const components = {};

  Object.values(schema).forEach(({node, component}) => {
    if (typeof node !== 'string' && component) {
      components[component.displayName || component.name] = component;
    }
  });

  return {
    ...defaultComponents,
    ...components,
  };
}
