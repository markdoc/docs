import { Ascii } from '../../components/Ascii';

export default {
  render: Ascii,
  attributes: {
    primary: {
      type: String,
      matches: ['worm', 'pencil', 'puzzle']
    }
  }
};
