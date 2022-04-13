import { SideBySide } from '../../components/SideBySide';

export default {
  Component: SideBySide,
  attributes: {
    appearance: { type: String, matches: ['none', 'box'], default: 'box' }
  }
};
