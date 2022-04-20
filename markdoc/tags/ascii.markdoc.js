import { Ascii } from '../../components/Ascii';

export default {
  render: Ascii,
  attributes: {
    type: {
      type: String,
      matches: ['worm', 'pencil', 'puzzle']
    }
  }
};
