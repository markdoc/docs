const callout = {
  render: 'Callout',
  description: 'Display the enclosed content in a callout box',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['caution', 'check', 'note', 'warning'],
      description:
        'Controls the color and icon of the callout. Can be: "caution", "check", "note", "warning"'
    },
    title: {
      type: String,
      description: 'The title displayed at the top of the callout'
    }
  }
};

module.exports = callout;