import Image from 'next/image';

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
};

const defaultComponents = {
  Image,
};

export function transformSchema(schema) {
  const tags = {};
  const nodes = {};

  Object.entries(schema).forEach(([tag, registration]) => {
    if (typeof registration.node === 'string') {
      const {node, component, ...schema} = registration;
      if (nodes[node]) {
        throw new Error(`Node already declared: ${node}`);
      }
      nodes[node] = {
        ...schema,
        tag: component,
      };
    } else {
      const {component, ...schema} = registration;
      if (tags[tag]) {
        throw new Error(`Tag already declared: ${tag}`);
      }
      tags[registration.tag || tag] = {
        tag,
        ...schema,
      };
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

  Object.entries(schema).forEach(([tag, registration]) => {
    if (typeof registration.node !== 'string' && registration.component) {
      components[registration.tag || tag] = registration.component;
    }
  });

  return {
    ...defaultComponents,
    ...components,
  };
}
