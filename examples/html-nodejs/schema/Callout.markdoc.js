module.exports = {
    render: 'markdoc-callout',
    description: 'Display the enclosed content in a callout box',
    children: ['paragraph'],
    attributes: {
      type: {
        type: String,
        default: 'note',
        matches: ['check', 'error', 'note', 'warning'],
        description:
          'Controls the color and icon of the callout. Can be: "caution", "check", "note", "warning"'
      },
      title: {
        type: String,
        description: 'The title displayed at the top of the callout'
      }
    }
  };
  